const UserManagementPage = () => {
  const users = [
    { name: 'Alex Morgan', role: 'Contracting', status: 'Active', email: 'alex.morgan@procureflow.com' },
    { name: 'Sienna Reed', role: 'Fiscal Officer', status: 'Active', email: 'sienna.reed@procureflow.com' },
    { name: 'Jordan Lee', role: 'FinCon', status: 'Inactive', email: 'jordan.lee@procureflow.com' }
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">User Management</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Manage roles, access, and activation status for workspace users.
        </p>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-400 dark:bg-slate-950">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {users.map((user) => (
              <tr key={user.email} className="text-xs text-slate-600 dark:text-slate-300">
                <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">{user.name}</td>
                <td className="px-4 py-3">{user.role}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-3 py-1 text-[10px] font-semibold ${
                    user.status === 'Active'
                      ? 'bg-emerald-100 text-emerald-600'
                      : 'bg-slate-200 text-slate-500'
                  }`}>
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementPage;
