import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../components/AppContext.jsx';

const emptyForm = {
  name: '',
  quantity: '',
  unit: ''
};

const ItemListPage = () => {
  const { id } = useParams();
  const { inProgress, saveItemList } = useAppContext();
  const navigate = useNavigate();
  const record = useMemo(() => inProgress.find((item) => item.id === id), [id, inProgress]);
  const [items, setItems] = useState(record?.items ?? []);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  if (!record) {
    return <p className="text-sm text-slate-500">Record not found.</p>;
  }

  const addOrUpdateItem = () => {
    if (!form.name.trim()) return;

    if (editingId) {
      setItems((prev) => prev.map((item) => (item.id === editingId ? { ...item, ...form } : item)));
      setEditingId(null);
      setForm(emptyForm);
      return;
    }

    setItems((prev) => [...prev, { id: `itm-${Date.now()}`, ...form }]);
    setForm(emptyForm);
  };

  const editItem = (item) => {
    setEditingId(item.id);
    setForm({
      name: item.name ?? '',
      quantity: item.quantity ?? '',
      unit: item.unit ?? ''
    });
  };

  const removeItem = (itemId) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
    if (editingId === itemId) {
      setEditingId(null);
      setForm(emptyForm);
    }
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
        <div className="grid gap-3 md:grid-cols-4">
          <input
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder="Material"
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
          <button
            onClick={addOrUpdateItem}
            className="rounded-lg bg-brand-500 px-3 py-2 text-sm font-semibold text-white"
          >
            {editingId ? 'Update Item' : 'Add Item'}
          </button>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-400 dark:bg-slate-950">
            <tr>
              <th className="px-4 py-3 text-left">Material</th>
              <th className="px-4 py-3 text-left">Qty</th>
              <th className="px-4 py-3 text-left">Unit</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {items.map((item) => (
              <tr key={item.id} className="text-xs text-slate-600 dark:text-slate-300">
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">{item.quantity}</td>
                <td className="px-4 py-3">{item.unit}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => editItem(item)}
                      className="rounded-lg border border-slate-200 px-2 py-1 text-[11px] font-semibold text-slate-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="rounded-lg border border-slate-200 px-2 py-1 text-[11px] font-semibold text-slate-500"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-end border-t border-slate-200 px-4 py-3 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-300">
          <span className="font-semibold">Total materials: {items.length}</span>
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
