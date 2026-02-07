import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../components/AppContext.jsx';

const ContractMailPage = () => {
  const { id } = useParams();
  const { inProgress, saveContractMail, settings, companies } = useAppContext();
  const navigate = useNavigate();
  const record = useMemo(() => inProgress.find((item) => item.id === id), [id, inProgress]);
  const [subject, setSubject] = useState(
    settings.contractingMail.subjectTemplate.replace('{{pendingNo}}', record?.pendingNo ?? '')
  );
  const [body, setBody] = useState(
    settings.contractingMail.bodyTemplate
      .replace('{{description}}', record?.description ?? '')
      .replace('{{deadline}}', 'Contract signature')
  );

  if (!record) {
    return <p className="text-sm text-slate-500">Record not found.</p>;
  }

  const vendorEmail = record.lowestBid?.companyId
    ? companies.find((company) => company.id === record.lowestBid.companyId)?.email
    : '';

  const handleSave = () => {
    saveContractMail(record.id, { subject, body, to: vendorEmail });
    navigate('/app/in-progress');
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Create Contract Mail</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Edit the contract mail content before sending.
        </p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-500">To</label>
            <input
              value={vendorEmail}
              readOnly
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500">Subject</label>
            <input
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500">Body</label>
            <textarea
              value={body}
              onChange={(event) => setBody(event.target.value)}
              className="mt-1 h-40 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSave}
            className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white"
          >
            Save Contract Mail Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractMailPage;
