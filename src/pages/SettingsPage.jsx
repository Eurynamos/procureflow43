import { useState } from 'react';
import { useAppContext } from '../components/AppContext.jsx';

const tabs = [
  { key: 'cisi', label: 'CISI Code' },
  { key: 'fund', label: 'Fund Manager' },
  { key: 'currency', label: 'Currency' },
  { key: 'rank', label: 'Rank' }
];

const SettingsPage = () => {
  const { settings, addSettingItem } = useAppContext();
  const [activeTab, setActiveTab] = useState('cisi');
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState({});

  const openModal = () => {
    setIsOpen(true);
    setFormState({});
  };

  const handleSave = () => {
    addSettingItem(activeTab, formState);
    setIsOpen(false);
  };

  const tabContent = {
    cisi: settings.cisiCodes,
    fund: settings.fundManagers,
    currency: settings.currencies,
    rank: settings.ranks
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Settings</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Configure codes, managers, currency lists, and rank values.
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
        <button
          onClick={openModal}
          className="ml-auto rounded-lg bg-brand-500 px-4 py-2 text-xs font-semibold text-white"
        >
          New {tabs.find((tab) => tab.key === activeTab)?.label}
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm dark:border-slate-800 dark:bg-slate-900">
        <pre className="whitespace-pre-wrap text-xs text-slate-600 dark:text-slate-300">
          {JSON.stringify(tabContent[activeTab], null, 2)}
        </pre>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold">Add new entry</h3>
            <p className="text-xs text-slate-500">Fill in the fields for the selected tab.</p>
            <div className="mt-4 grid gap-3">
              {activeTab === 'cisi' && (
                <>
                  <input
                    placeholder="Code"
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    onChange={(event) => setFormState((prev) => ({ ...prev, code: event.target.value }))}
                  />
                  <input
                    placeholder="Name"
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
                  />
                  <input
                    placeholder="Description"
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    onChange={(event) => setFormState((prev) => ({ ...prev, description: event.target.value }))}
                  />
                </>
              )}
              {activeTab === 'fund' && (
                <>
                  <input
                    placeholder="Code"
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    onChange={(event) => setFormState((prev) => ({ ...prev, code: event.target.value }))}
                  />
                  <input
                    placeholder="Division"
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    onChange={(event) => setFormState((prev) => ({ ...prev, division: event.target.value }))}
                  />
                  <input
                    placeholder="Name"
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
                  />
                  <input
                    placeholder="Description"
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    onChange={(event) => setFormState((prev) => ({ ...prev, description: event.target.value }))}
                  />
                </>
              )}
              {activeTab === 'currency' && (
                <>
                  <input
                    placeholder="Symbol"
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    onChange={(event) => setFormState((prev) => ({ ...prev, symbol: event.target.value }))}
                  />
                  <input
                    placeholder="Currency Name"
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
                  />
                  <input
                    placeholder="Description"
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    onChange={(event) => setFormState((prev) => ({ ...prev, description: event.target.value }))}
                  />
                </>
              )}
              {activeTab === 'rank' && (
                <>
                  <input
                    placeholder="Symbol (COL, MAJ)"
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    onChange={(event) => setFormState((prev) => ({ ...prev, symbol: event.target.value }))}
                  />
                  <input
                    placeholder="Rank"
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    onChange={(event) => setFormState((prev) => ({ ...prev, rank: event.target.value }))}
                  />
                </>
              )}
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
