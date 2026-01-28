import { useAppContext } from '../components/AppContext.jsx';

const CompletedPage = () => {
  const { completed, markDelivered, markPaid } = useAppContext();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Completed</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Track delivery and payment confirmations.
        </p>
      </div>
      <div className="space-y-3">
        {completed.map((item) => (
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
              <p>Status: {item.status}</p>
              <p>Updated: {item.updatedAt}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {item.status === 'awaiting delivery' && (
                <button
                  onClick={() => markDelivered(item.id)}
                  className="rounded-lg bg-brand-500 px-3 py-1 text-xs font-semibold text-white"
                >
                  Delivery Completed
                </button>
              )}
              {item.status === 'awaiting payment' && (
                <button
                  onClick={() => markPaid(item.id)}
                  className="rounded-lg bg-brand-500 px-3 py-1 text-xs font-semibold text-white"
                >
                  Payment Completed
                </button>
              )}
              {item.status === 'completed finish' && (
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-semibold text-emerald-600">
                  Process finished
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompletedPage;
