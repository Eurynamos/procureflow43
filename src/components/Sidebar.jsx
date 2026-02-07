import { NavLink, useNavigate } from 'react-router-dom';
import { useAppContext } from './AppContext.jsx';
import {
  ChartBarIcon,
  ClipboardDocumentCheckIcon,
  DocumentIcon,
  FolderOpenIcon,
  QueueListIcon,
  AdjustmentsHorizontalIcon,
  UserGroupIcon,
  BuildingOffice2Icon,
  ArrowRightOnRectangleIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';

const navItems = [
  { label: 'Dashboard', to: '/app/dashboard', icon: ChartBarIcon },
  { label: 'Fiscal Files', to: '/app/fiscal-files', icon: DocumentIcon },
  { label: 'Contracting', type: 'heading' },
  { label: 'Pending Files', to: '/app/pending-files', icon: ClipboardDocumentCheckIcon },
  { label: 'In Progress', to: '/app/in-progress', icon: FolderOpenIcon },
  { label: 'Completed', to: '/app/completed', icon: QueueListIcon },
  { label: 'Results', to: '/app/results', icon: ClipboardDocumentCheckIcon },
  { label: 'Management', type: 'heading' },
  { label: 'Settings', to: '/app/settings', icon: AdjustmentsHorizontalIcon },
  { label: 'User Management', to: '/app/user-management', icon: UserGroupIcon },
  { label: 'Companies Mgmt.', to: '/app/companies-management', icon: BuildingOffice2Icon }
];

const Sidebar = () => {
  const { sidebarOpen, toggleSidebar, user } = useAppContext();
  const navigate = useNavigate();

  return (
    <aside
      className={`flex flex-col border-r border-slate-200 bg-white transition-all duration-200 dark:border-slate-800 dark:bg-slate-900 ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-white">
            PF
          </div>
          {sidebarOpen && (
            <div>
              <p className="text-sm font-semibold">ProcureFlow</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Operations</p>
            </div>
          )}
        </div>
        <button
          onClick={toggleSidebar}
          className="hidden rounded-lg border border-slate-200 p-1 text-slate-500 hover:text-slate-900 md:inline-flex dark:border-slate-700 dark:text-slate-400 dark:hover:text-white"
          aria-label="Toggle sidebar"
        >
          <span className="text-xs">{sidebarOpen ? '⟨' : '⟩'}</span>
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-3 pb-6">
        {navItems.map((item) => {
          if (item.type === 'heading') {
            return (
              <p
                key={item.label}
                className={`px-3 pb-2 pt-4 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 ${
                  sidebarOpen ? 'block' : 'hidden'
                }`}
              >
                {item.label}
              </p>
            );
          }

          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  isActive
                    ? 'bg-brand-500/10 text-brand-500'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/60'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              {sidebarOpen && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 px-3 py-4 dark:border-slate-800">
        <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-left text-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/20 text-brand-500">
            {user.name.slice(0, 1)}
          </div>
          {sidebarOpen && (
            <div className="flex-1">
              <p className="font-semibold">
                {user.name} {user.surname}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{user.title}</p>
            </div>
          )}
          <button
            onClick={() => navigate('/app/profile')}
            className="rounded-md border border-slate-200 p-1 text-slate-500 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:text-white"
            aria-label="Edit profile"
          >
            <PencilSquareIcon className="h-4 w-4" />
          </button>
        </div>
        <button
          onClick={() => navigate('/')}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <ArrowRightOnRectangleIcon className="h-4 w-4" />
          {sidebarOpen && 'Log out'}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
