import { Link } from 'react-router-dom';
import { useAppContext } from '../components/AppContext.jsx';

const ResultsPage = () => {
  const { results } = useAppContext();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Results</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Completed finish records with full lifecycle details.
        </p>
      </div>
      <div className="space-y-3">
        {results.map((item) => (
          <Link
            key={item.id}
            to={`/app/results/${item.id}`}
            className="block rounded-xl border border-slate-200 bg-white p-4 text-sm hover:border-brand-500 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Pending No</p>
                <p className="font-semibold">{item.pendingNo}</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-semibold text-emerald-600">
                {item.status}
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;
