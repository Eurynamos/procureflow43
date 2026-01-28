import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../components/AppContext.jsx';

const tabs = [
  { key: 'awaiting item list', label: 'Item List' },
  { key: 'awaiting invitation mail', label: 'Invitation Mail' },
  { key: 'awaiting bids', label: 'Bids' },
  { key: 'awaiting contract', label: 'Contract' },
  { key: 'awaiting contract mail', label: 'Contract Mail' },
  { key: 'awaiting contract sign', label: 'Contract Sign' }
];

const InProgressPage = () => {
  const { inProgress } = useAppContext();
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const navigate = useNavigate();

  const filtered = useMemo(
    () => inProgress.filter((item) => item.status === activeTab),
    [inProgress, activeTab]
  );

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">In Progress</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Track contracting workflows across each operational stage.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-full px-4 py-2 text-xs font-semibold ${
              activeTab === tab.key
                ? 'bg-brand-500 text-white'
                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 text-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Pending No</p>
              <p className="font-semibold">{item.pendingNo}</p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{item.description}</p>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              <p>Last update: {item.updatedAt}</p>
              <p>Updated by: {item.updatedBy}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {item.status === 'awaiting item list' && (
                <button
                  onClick={() => navigate(`/app/in-progress/${item.id}/items`)}
                  className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600"
                >
                  Open Item List
                </button>
              )}
              {item.status === 'awaiting invitation mail' && (
                <>
                  <button
                    onClick={() => navigate(`/app/in-progress/${item.id}/invitation`)}
                    className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600"
                  >
                    Create Invitation Mail
                  </button>
                  <button
                    disabled={!item.invitationCreated}
                    className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                      item.invitationCreated
                        ? 'bg-brand-500 text-white'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    Send Invitation Mail
                  </button>
                </>
              )}
              {item.status === 'awaiting bids' && (
                <button
                  onClick={() => navigate(`/app/in-progress/${item.id}/bids`)}
                  className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600"
                >
                  Save Offer
                </button>
              )}
              {item.status === 'awaiting contract' && (
                <button
                  onClick={() => navigate(`/app/in-progress/${item.id}/contract`)}
                  className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600"
                >
                  Create Purchase Order
                </button>
              )}
              {item.status === 'awaiting contract mail' && (
                <>
                  <button
                    onClick={() => navigate(`/app/in-progress/${item.id}/contract-mail`)}
                    className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600"
                  >
                    Create Contract Mail
                  </button>
                  <button
                    disabled={!item.contractMailCreated}
                    className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                      item.contractMailCreated
                        ? 'bg-brand-500 text-white'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    Send Contract Mail
                  </button>
                </>
              )}
              {item.status === 'awaiting contract sign' && (
                <button
                  onClick={() => navigate(`/app/in-progress/${item.id}/contract-sign`)}
                  className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600"
                >
                  Record Contract Sign
                </button>
              )}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900">
            No records in this stage yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default InProgressPage;
