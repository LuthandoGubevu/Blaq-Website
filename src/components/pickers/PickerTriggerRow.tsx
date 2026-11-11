import type { ReactNode } from 'react';
import { useId } from 'react';
import { ChevronRightIcon } from '../icons/ChevronRightIcon';
import styles from './PickerTriggerRow.module.css';

interface PickerTriggerRowProps {
  label: string;
  placeholder: string;
  value: string | null;
  icon?: ReactNode;
  onClick: () => void;
  isOpen: boolean;
  ariaHasPopup: 'listbox' | 'dialog' | 'grid';
  subLabel?: string;
}

export function PickerTriggerRow({
  label,
  placeholder,
  value,
  icon,
  onClick,
  isOpen,
  ariaHasPopup,
  subLabel,
}: PickerTriggerRowProps) {
  const labelId = useId();

  return (
    <div className={styles.field}>
      <span id={labelId} className={styles.label}>
        {label}
      </span>
      <button
        type="button"
        className={`${styles.trigger} ${value ? styles.triggerFilled : ''}`}
        onClick={onClick}
        aria-labelledby={labelId}
        aria-haspopup={ariaHasPopup}
        aria-expanded={isOpen}
      >
        <span className={styles.triggerContent}>
          {icon}
          <span className={value ? undefined : styles.placeholder}>{value ?? placeholder}</span>
        </span>
        <ChevronRightIcon
          size={16}
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
        />
      </button>
      {subLabel ? <span className={styles.subLabel}>{subLabel}</span> : null}
    </div>
  );
}
