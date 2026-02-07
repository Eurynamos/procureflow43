import { MagnifyingGlassIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useAppContext } from './AppContext.jsx';

const TopBar = () => {
  const { darkMode, toggleDarkMode } = useAppContext();

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-900">
      <div>
        <h1 className="text-lg font-semibold">ProcureFlow</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Procurement and contracting intelligence workspace
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500 md:flex dark:border-slate-700">
          <MagnifyingGlassIcon className="h-4 w-4" />
          Search pending numbers, vendors, requests
        </div>
        <button
          onClick={toggleDarkMode}
          className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:text-white"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
};

export default TopBar;
