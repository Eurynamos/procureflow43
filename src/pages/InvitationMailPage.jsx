import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../components/AppContext.jsx';

const InvitationMailPage = () => {
  const { id } = useParams();
  const { inProgress, saveInvitationMail, settings, companyCategories, companies } = useAppContext();
  const navigate = useNavigate();
  const record = useMemo(() => inProgress.find((item) => item.id === id), [id, inProgress]);
  const [subject, setSubject] = useState(
    settings.contractingMail.subjectTemplate.replace('{{pendingNo}}', record?.pendingNo ?? '')
  );
  const [body, setBody] = useState(
    settings.contractingMail.bodyTemplate
      .replace('{{description}}', record?.description ?? '')
      .replace('{{deadline}}', '7 business days')
  );

  if (!record) {
    return <p className="text-sm text-slate-500">Record not found.</p>;
  }

  const category = companyCategories.find((item) => item.name === record.category);
  const bcc = category
    ? category.companies
        .map((companyId) => companies.find((company) => company.id === companyId)?.email)
        .filter(Boolean)
        .join(', ')
    : '';

  const handleSave = () => {
    saveInvitationMail(record.id, { subject, body, bcc });
    navigate('/app/in-progress');
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Create Invitation Mail</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Review the automatically generated mail content before sending.
        </p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-500">BCC</label>
            <input
              value={bcc}
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
            Save Invitation Mail
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvitationMailPage;
