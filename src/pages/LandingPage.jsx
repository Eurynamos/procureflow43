import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white">
            PF
          </div>
          <div>
            <h1 className="text-lg font-semibold">ProcureFlow</h1>
            <p className="text-xs text-slate-500">Procurement Operations Suite</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-brand-500 hover:text-brand-500"
            to="/login"
          >
            Log in
          </Link>
          <Link
            className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600"
            to="/signup"
          >
            Sign up
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-16 pt-10 lg:flex-row">
        <section className="flex-1 space-y-6">
          <span className="inline-flex rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-500">
            Internal procurement intelligence
          </span>
          <h2 className="text-3xl font-semibold leading-tight">
            Streamline procurement, contracting, and compliance workflows with a single operational
            hub.
          </h2>
          <p className="text-sm text-slate-600">
            ProcureFlow helps procurement departments manage fiscal files, contract stages, and
            vendor engagement with clear visibility. Designed for internal teams, it prioritizes
            traceability, approval states, and reporting.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/login"
              className="rounded-lg bg-brand-500 px-5 py-2 text-sm font-semibold text-white"
            >
              Launch workspace
            </Link>
            <Link
              to="/signup"
              className="rounded-lg border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700"
            >
              Request access
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: 'Lifecycle tracking',
                description: 'Monitor pending files through review, bidding, contract, and delivery.'
              },
              {
                title: 'Structured data entry',
                description: 'Capture fiscal, vendor, and contract metadata with consistent inputs.'
              },
              {
                title: 'Audit-ready logs',
                description: 'Every status change stores timestamps and owner details.'
              },
              {
                title: 'Responsive workspace',
                description: 'Optimized for desktop and tablet with compact spacing.'
              }
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <h3 className="text-sm font-semibold">{feature.title}</h3>
                <p className="mt-2 text-xs text-slate-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="flex-1">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold">Daily procurement overview</h3>
            <p className="mt-2 text-xs text-slate-500">
              Visualize open tasks across fiscal files, contracting stages, and approvals.
            </p>
            <div className="mt-6 space-y-3">
              {[
                { label: 'Awaiting review', value: '12 files', tone: 'bg-amber-100 text-amber-700' },
                { label: 'Awaiting item list', value: '8 files', tone: 'bg-sky-100 text-sky-700' },
                { label: 'Awaiting bids', value: '4 files', tone: 'bg-violet-100 text-violet-700' },
                { label: 'Awaiting contract sign', value: '3 files', tone: 'bg-emerald-100 text-emerald-700' }
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-lg border border-slate-100 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p className="text-xs text-slate-500">Procurement operations queue</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.tone}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
