import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../components/AppContext.jsx';

const ItemListPage = () => {
  const { id } = useParams();
  const { inProgress, saveItemList } = useAppContext();
  const navigate = useNavigate();
  const record = useMemo(() => inProgress.find((item) => item.id === id), [id, inProgress]);
  const [items, setItems] = useState(record?.items ?? []);
  const [form, setForm] = useState({
    name: '',
    quantity: 1,
    unit: 'pcs',
    price: 0
  });

  if (!record) {
    return <p className="text-sm text-slate-500">Record not found.</p>;
  }

  const total = items.reduce((sum, item) => sum + item.total, 0);

  const addItem = () => {
    const totalValue = Number(form.quantity) * Number(form.price);
    setItems((prev) => [
      ...prev,
      { id: `itm-${prev.length + 1}`, ...form, total: totalValue }
    ]);
    setForm({ name: '', quantity: 1, unit: 'pcs', price: 0 });
  };

  const removeItem = (itemId) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleSave = () => {
    saveItemList(record.id, items);
    navigate('/app/in-progress');
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Item List - {record.pendingNo}</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Add materials for the pending file and save the list.
        </p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-3 md:grid-cols-5">
          <input
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder="Material name"
          />
          <input
            value={form.quantity}
            type="number"
            onChange={(event) => setForm((prev) => ({ ...prev, quantity: event.target.value }))}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder="Qty"
          />
          <input
            value={form.unit}
            onChange={(event) => setForm((prev) => ({ ...prev, unit: event.target.value }))}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder="Unit"
          />
          <input
            value={form.price}
            type="number"
            onChange={(event) => setForm((prev) => ({ ...prev, price: event.target.value }))}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder="Price"
          />
          <button
            onClick={addItem}
            className="rounded-lg bg-brand-500 px-3 py-2 text-sm font-semibold text-white"
          >
            Add Item
          </button>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-400 dark:bg-slate-950">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Material</th>
              <th className="px-4 py-3 text-left">Qty</th>
              <th className="px-4 py-3 text-left">Unit</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {items.map((item, index) => (
              <tr key={item.id} className="text-xs text-slate-600 dark:text-slate-300">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">{item.quantity}</td>
                <td className="px-4 py-3">{item.unit}</td>
                <td className="px-4 py-3">{Number(item.price).toLocaleString()}</td>
                <td className="px-4 py-3">{item.total.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="rounded-lg border border-slate-200 px-2 py-1 text-[11px] font-semibold text-slate-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-300">
          <span>Total materials: {items.length}</span>
          <span className="font-semibold">Total amount: {total.toLocaleString()}</span>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white"
        >
          Save Item List
        </button>
      </div>
    </div>
  );
};

export default ItemListPage;
