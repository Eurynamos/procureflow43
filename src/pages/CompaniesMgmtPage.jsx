import { useState } from 'react';
import { useAppContext } from '../components/AppContext.jsx';

const tabs = [
  { key: 'companies', label: 'Companies' },
  { key: 'categories', label: 'Company Categories' },
  { key: 'mapping', label: 'Category Mapping' }
];

const CompaniesMgmtPage = () => {
  const { companies, companyCategories } = useAppContext();
  const [activeTab, setActiveTab] = useState('companies');

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Companies Management</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Manage supplier records, categories, and mapping across categories.
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

      {activeTab === 'companies' && (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-400 dark:bg-slate-950">
              <tr>
                <th className="px-4 py-3 text-left">Company</th>
                <th className="px-4 py-3 text-left">City</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {companies.map((company) => (
                <tr key={company.id} className="text-xs text-slate-600 dark:text-slate-300">
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">{company.name}</td>
                  <td className="px-4 py-3">{company.city}</td>
                  <td className="px-4 py-3">{company.email}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-3 py-1 text-[10px] font-semibold ${
                      company.status === 'Active'
                        ? 'bg-emerald-100 text-emerald-600'
                        : 'bg-slate-200 text-slate-500'
                    }`}>
                      {company.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'categories' && (
        <div className="space-y-3">
          {companyCategories.map((category) => (
            <div
              key={category.id}
              className="rounded-xl border border-slate-200 bg-white p-4 text-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <p className="font-semibold">{category.name}</p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {category.companies.length} linked companies
              </p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'mapping' && (
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="space-y-3">
            {companyCategories.map((category) => (
              <div key={category.id} className="rounded-lg border border-slate-100 p-3">
                <p className="font-semibold">{category.name}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {category.companies.map((companyId) => {
                    const company = companies.find((item) => item.id === companyId);
                    return (
                      <span
                        key={companyId}
                        className="rounded-full bg-brand-500/10 px-3 py-1 text-[10px] font-semibold text-brand-500"
                      >
                        {company?.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompaniesMgmtPage;
