import { useMemo, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import SortHeader from '../components/SortHeader.jsx';
import { useSortableData } from '../components/useSortableData.js';
import { useAppContext } from '../components/AppContext.jsx';

const FiscalFilesPage = () => {
  const { fiscalFiles, addFiscalFile, settings, user } = useAppContext();
  const { items, requestSort, sortConfig } = useSortableData(fiscalFiles);
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState({
    requestNumber: '',
    description: '',
    amount: '',
    currency: settings.currencies[0]?.name ?? 'USD',
    cisiCode: settings.cisiCodes[0]?.code ?? '',
    fundManager: settings.fundManagers[0]?.code ?? ''
  });

  const createdDate = useMemo(() => new Date().toISOString().split('T')[0], []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    addFiscalFile({
      ...formState,
      amount: Number(formState.amount),
      createdDate,
      createdBy: user.email
    });
    setIsOpen(false);
    setFormState({
      requestNumber: '',
      description: '',
      amount: '',
      currency: settings.currencies[0]?.name ?? 'USD',
      cisiCode: settings.cisiCodes[0]?.code ?? '',
      fundManager: settings.fundManagers[0]?.code ?? ''
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Fiscal Files</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Create fiscal files that automatically appear in Pending Files.
          </p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white"
        >
          <PlusIcon className="h-4 w-4" />
          Create Fiscal Files
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-400 dark:bg-slate-950">
            <tr>
              <th className="px-4 py-3"><SortHeader label="Pending No" sortKey="pendingNo" sortConfig={sortConfig} onSort={requestSort} /></th>
              <th className="px-4 py-3"><SortHeader label="Request" sortKey="requestNumber" sortConfig={sortConfig} onSort={requestSort} /></th>
              <th className="px-4 py-3"><SortHeader label="Description" sortKey="description" sortConfig={sortConfig} onSort={requestSort} /></th>
              <th className="px-4 py-3"><SortHeader label="Amount" sortKey="amount" sortConfig={sortConfig} onSort={requestSort} /></th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {items.map((file) => (
              <tr key={file.id} className="text-xs text-slate-600 dark:text-slate-300">
                <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">{file.pendingNo}</td>
                <td className="px-4 py-3">{file.requestNumber}</td>
                <td className="px-4 py-3">{file.description}</td>
                <td className="px-4 py-3">{file.currency} {file.amount.toLocaleString()}</td>
                <td className="px-4 py-3">{file.createdDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold">Create Fiscal File</h3>
            <p className="text-xs text-slate-500">Pending number is generated automatically.</p>
            <div className="mt-4 grid gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-500">Request Number</label>
                <input
                  name="requestNumber"
                  value={formState.requestNumber}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  placeholder="REQ-Alpha-84"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">Description</label>
                <input
                  name="description"
                  value={formState.description}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  placeholder="Procurement description"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-slate-500">Amount</label>
                  <input
                    name="amount"
                    value={formState.amount}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500">Currency</label>
                  <select
                    name="currency"
                    value={formState.currency}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  >
                    {settings.currencies.map((currency) => (
                      <option key={currency.name} value={currency.name}>
                        {currency.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-slate-500">CISI Code</label>
                  <select
                    name="cisiCode"
                    value={formState.cisiCode}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  >
                    {settings.cisiCodes.map((code) => (
                      <option key={code.code} value={code.code}>
                        {code.code}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500">Fund Manager</label>
                  <select
                    name="fundManager"
                    value={formState.fundManager}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  >
                    {settings.fundManagers.map((manager) => (
                      <option key={manager.code} value={manager.code}>
                        {manager.code} - {manager.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-slate-500">Created Date</label>
                  <input
                    disabled
                    value={createdDate}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500">Created By</label>
                  <input
                    disabled
                    value={user.email}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white"
                >
                  Save Fiscal File
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FiscalFilesPage;
