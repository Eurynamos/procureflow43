import { useAppContext } from '../components/AppContext.jsx';

const DashboardPage = () => {
  const { fiscalFiles, pendingFiles, inProgress, completed } = useAppContext();

  const cards = [
    {
      label: 'Fiscal files',
      value: fiscalFiles.length,
      helper: 'Created for the current fiscal year'
    },
    {
      label: 'Pending review',
      value: pendingFiles.length,
      helper: 'Waiting for contracting validation'
    },
    {
      label: 'In progress',
      value: inProgress.length,
      helper: 'Active contracting workflows'
    },
    {
      label: 'Completed',
      value: completed.length,
      helper: 'Awaiting delivery or payment'
    }
  ];

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{card.label}</p>
            <p className="mt-2 text-2xl font-semibold">{card.value}</p>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{card.helper}</p>
          </div>
        ))}
      </section>
      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-sm font-semibold">Operational insights</h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Highlights based on your procurement workload.
          </p>
          <div className="mt-4 space-y-3">
            {[
              '4 files waiting for item lists',
              '2 invitations ready to send',
              '1 contract awaiting signature',
              '3 deliveries expected this week'
            ].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-300">
                <span>{item}</span>
                <span className="rounded-full bg-brand-500/10 px-2 py-1 text-[10px] font-semibold text-brand-500">Active</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-sm font-semibold">Upcoming milestones</h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Track the next action for open procurement cases.
          </p>
          <div className="mt-4 space-y-3">
            {[
              { title: 'P260002', detail: 'Awaiting item list review', date: 'Tomorrow' },
              { title: 'P260001', detail: 'Invitation draft due', date: 'In 2 days' },
              { title: 'P250887', detail: 'Awaiting payment update', date: 'This week' }
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-slate-100 px-3 py-2 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700 dark:text-slate-200">{item.title}</span>
                  <span className="text-[10px] text-slate-400">{item.date}</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
