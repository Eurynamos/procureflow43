import { useState } from 'react';
import SortHeader from '../components/SortHeader.jsx';
import { useSortableData } from '../components/useSortableData.js';
import { useAppContext } from '../components/AppContext.jsx';

const PendingFilesPage = () => {
  const { pendingFiles, companyCategories, moveToInProgress } = useAppContext();
  const { items, requestSort, sortConfig } = useSortableData(pendingFiles);
  const [selectedFile, setSelectedFile] = useState(null);
  const [reviewState, setReviewState] = useState({
    turkishDescription: '',
    contactName: '',
    contactPhone: '',
    category: ''
  });

  const openReview = (file) => {
    setSelectedFile(file);
    setReviewState({
      turkishDescription: '',
      contactName: '',
      contactPhone: '',
      category: companyCategories[0]?.name ?? ''
    });
  };

  const handleReviewSave = () => {
    moveToInProgress(selectedFile, reviewState);
    setSelectedFile(null);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Pending Files</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Records created in Fiscal Files appear here with status “awaiting review”.
        </p>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-400 dark:bg-slate-950">
            <tr>
              <th className="px-4 py-3"><SortHeader label="Pending No" sortKey="pendingNo" sortConfig={sortConfig} onSort={requestSort} /></th>
              <th className="px-4 py-3"><SortHeader label="Description" sortKey="description" sortConfig={sortConfig} onSort={requestSort} /></th>
              <th className="px-4 py-3"><SortHeader label="Amount" sortKey="amount" sortConfig={sortConfig} onSort={requestSort} /></th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {items.map((file) => (
              <tr key={file.id} className="text-xs text-slate-600 dark:text-slate-300">
                <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">{file.pendingNo}</td>
                <td className="px-4 py-3">{file.description}</td>
                <td className="px-4 py-3">{file.currency} {file.amount.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-semibold text-amber-700">
                    {file.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => openReview(file)}
                    className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600"
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedFile && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold">Review Pending File</h3>
            <p className="text-xs text-slate-500">Add contracting details before moving to item list.</p>
            <div className="mt-4 grid gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-500">Turkish Description</label>
                <input
                  value={reviewState.turkishDescription}
                  onChange={(event) =>
                    setReviewState((prev) => ({ ...prev, turkishDescription: event.target.value }))
                  }
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-slate-500">Contact Name</label>
                  <input
                    value={reviewState.contactName}
                    onChange={(event) =>
                      setReviewState((prev) => ({ ...prev, contactName: event.target.value }))
                    }
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500">Contact Phone</label>
                  <input
                    value={reviewState.contactPhone}
                    onChange={(event) =>
                      setReviewState((prev) => ({ ...prev, contactPhone: event.target.value }))
                    }
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">Company Categories</label>
                <select
                  value={reviewState.category}
                  onChange={(event) =>
                    setReviewState((prev) => ({ ...prev, category: event.target.value }))
                  }
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                >
                  {companyCategories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setSelectedFile(null)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReviewSave}
                  className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white"
                >
                  Save Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingFilesPage;
