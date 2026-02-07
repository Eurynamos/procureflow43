import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

const SortHeader = ({ label, sortKey, sortConfig, onSort }) => {
  const isActive = sortConfig?.key === sortKey;
  const direction = sortConfig?.direction;

  return (
    <button
      type="button"
      onClick={() => onSort(sortKey)}
      className={clsx(
        'flex items-center gap-1 text-left text-xs font-semibold uppercase tracking-wide text-slate-500',
        isActive && 'text-brand-500'
      )}
    >
      {label}
      {isActive ? (
        direction === 'ascending' ? (
          <ChevronUpIcon className="h-3 w-3" />
        ) : (
          <ChevronDownIcon className="h-3 w-3" />
        )
      ) : null}
    </button>
  );
};

export default SortHeader;
