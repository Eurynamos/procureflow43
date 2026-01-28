import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 text-white">
            PF
          </div>
          <h1 className="text-xl font-semibold">Create your account</h1>
          <p className="text-sm text-slate-500">Join ProcureFlow for internal procurement.</p>
        </div>
        <form className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-slate-500">Name</label>
              <input
                type="text"
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                placeholder="Alex"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">Surname</label>
              <input
                type="text"
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                placeholder="Morgan"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              placeholder="you@procureflow.com"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500">Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              placeholder="••••••••"
            />
          </div>
          <button
            type="button"
            onClick={() => navigate('/app/dashboard')}
            className="w-full rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white"
          >
            Sign up
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-slate-500">
          Already have access?{' '}
          <Link className="font-semibold text-brand-500" to="/login">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
