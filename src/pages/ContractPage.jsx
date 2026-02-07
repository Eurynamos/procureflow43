import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../components/AppContext.jsx';

const ContractPage = () => {
  const { id } = useParams();
  const { inProgress, createPurchaseOrder } = useAppContext();
  const record = useMemo(() => inProgress.find((item) => item.id === id), [id, inProgress]);
  const [type, setType] = useState('P');
  const navigate = useNavigate();

  if (!record) {
    return <p className="text-sm text-slate-500">Record not found.</p>;
  }

  const handleCreate = () => {
    createPurchaseOrder(record.id, type);
    navigate('/app/in-progress');
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Create Purchase Order</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Select the contract type before generating the purchase order.
        </p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-500">Contract Type</label>
            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            >
              <option value="P">P - Purchase</option>
              <option value="C">C - Contract</option>
            </select>
          </div>
          <div className="rounded-lg border border-slate-100 bg-slate-50 p-4 text-xs text-slate-600">
            <p><span className="font-semibold">Pending No:</span> {record.pendingNo}</p>
            <p><span className="font-semibold">Description:</span> {record.description}</p>
            <p><span className="font-semibold">Total amount:</span> Calculated after pricing stage</p>
            <p><span className="font-semibold">Materials:</span> {record.items?.length ?? 0}</p>
          </div>
          <button
            onClick={handleCreate}
            className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white"
          >
            Create Purchase Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractPage;
