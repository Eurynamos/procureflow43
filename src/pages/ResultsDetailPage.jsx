import { useParams } from 'react-router-dom';
import { useAppContext } from '../components/AppContext.jsx';

const ResultsDetailPage = () => {
  const { id } = useParams();
  const { results } = useAppContext();
  const record = results.find((item) => item.id === id);

  if (!record) {
    return <p className="text-sm text-slate-500">Result not found.</p>;
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Result Detail - {record.pendingNo}</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">{record.description}</p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-sm font-semibold">Lifecycle timeline</h3>
        <div className="mt-4 space-y-3">
          {record.timeline.map((entry) => (
            <div
              key={entry.label}
              className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-300"
            >
              <span className="font-semibold text-slate-700 dark:text-slate-200">{entry.label}</span>
              <span>{entry.date}</span>
              <span>{entry.by}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsDetailPage;
