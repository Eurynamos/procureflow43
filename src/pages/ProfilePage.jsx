import { useAppContext } from '../components/AppContext.jsx';

const ProfilePage = () => {
  const { user, settings, darkMode, toggleDarkMode } = useAppContext();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">User Profile</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Update personal information and select the active rank.
        </p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap gap-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-brand-500/10 text-2xl font-semibold text-brand-500">
            {user.name.slice(0, 1)}
          </div>
          <div className="flex-1 space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-slate-500">Name</label>
                <input
                  defaultValue={user.name}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">Surname</label>
                <input
                  defaultValue={user.surname}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-slate-500">Rank</label>
                <select className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
                  {settings.ranks.map((rank) => (
                    <option key={rank.symbol} value={rank.rank}>
                      {rank.rank}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">Title</label>
                <input
                  defaultValue={user.title}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-slate-500">Start Date</label>
                <input
                  type="date"
                  defaultValue={user.startDate}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">Mail Address</label>
                <input
                  disabled
                  value={user.email}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500">Theme</span>
              <button
                onClick={toggleDarkMode}
                className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600"
              >
                {darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
