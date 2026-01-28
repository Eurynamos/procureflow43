import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../components/AppContext.jsx';

const BidsPage = () => {
  const { id } = useParams();
  const { inProgress, companyCategories, companies, saveBids } = useAppContext();
  const navigate = useNavigate();
  const record = useMemo(() => inProgress.find((item) => item.id === id), [id, inProgress]);

  const selectedCategory = companyCategories.find((item) => item.name === record?.category);
  const bidders = selectedCategory
    ? selectedCategory.companies.map((companyId) => companies.find((company) => company.id === companyId))
    : [];

  const [bids, setBids] = useState(() =>
    bidders.map((company) => ({
      companyId: company?.id,
      companyName: company?.name,
      email: company?.email,
      offer: ''
    }))
  );

  if (!record) {
    return <p className="text-sm text-slate-500">Record not found.</p>;
  }

  const handleChange = (companyId, value) => {
    setBids((prev) =>
      prev.map((bid) => (bid.companyId === companyId ? { ...bid, offer: value } : bid))
    );
  };

  const handleSave = () => {
    saveBids(record.id, bids);
    navigate('/app/in-progress');
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Save Bids</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Enter supplier offers for pending number {record.pendingNo}.
        </p>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-400 dark:bg-slate-950">
            <tr>
              <th className="px-4 py-3 text-left">Company</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Offer</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {bids.map((bid) => (
              <tr key={bid.companyId} className="text-xs text-slate-600 dark:text-slate-300">
                <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">{bid.companyName}</td>
                <td className="px-4 py-3">{bid.email}</td>
                <td className="px-4 py-3">
                  <input
                    value={bid.offer}
                    onChange={(event) => handleChange(bid.companyId, event.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    placeholder="Offer value"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white"
        >
          Save Bids
        </button>
      </div>
    </div>
  );
};

export default BidsPage;
