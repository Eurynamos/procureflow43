import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../components/AppContext.jsx';

const ContractSignPage = () => {
  const { id } = useParams();
  const { inProgress, saveContractSign } = useAppContext();
  const record = inProgress.find((item) => item.id === id);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    signDate: new Date().toISOString().split('T')[0],
    explanation: '',
    deliveryDays: 5,
    deliveryType: 'calendar'
  });

  if (!record) {
    return <p className="text-sm text-slate-500">Record not found.</p>;
  }

  const handleSave = () => {
    saveContractSign(record.id, form);
    navigate('/app/completed');
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Contract Sign</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Record signature details to move into completion.
        </p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-500">Signature Date</label>
            <input
              type="date"
              value={form.signDate}
              onChange={(event) => setForm((prev) => ({ ...prev, signDate: event.target.value }))}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500">Explanation</label>
            <textarea
              value={form.explanation}
              onChange={(event) => setForm((prev) => ({ ...prev, explanation: event.target.value }))}
              className="mt-1 h-28 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-slate-500">Delivery Days</label>
              <input
                type="number"
                value={form.deliveryDays}
                onChange={(event) => setForm((prev) => ({ ...prev, deliveryDays: event.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">Day Type</label>
              <div className="mt-2 flex items-center gap-3 text-xs text-slate-600">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={form.deliveryType === 'calendar'}
                    onChange={() => setForm((prev) => ({ ...prev, deliveryType: 'calendar' }))}
                  />
                  Calendar days
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={form.deliveryType === 'business'}
                    onChange={() => setForm((prev) => ({ ...prev, deliveryType: 'business' }))}
                  />
                  Business days
                </label>
              </div>
            </div>
          </div>
          <button
            onClick={handleSave}
            className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white"
          >
            Save Contract Sign
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractSignPage;
