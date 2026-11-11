import { CheckIcon } from '../icons/CheckIcon';
import styles from './PickerOptionRow.module.css';

interface PickerOptionRowProps {
  label: string;
  subLabel?: string;
  isSelected: boolean;
  onSelect: () => void;
}

export function PickerOptionRow({ label, subLabel, isSelected, onSelect }: PickerOptionRowProps) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={isSelected}
      className={styles.row}
      onClick={onSelect}
    >
      <span className={styles.labelGroup}>
        <span>{label}</span>
        {subLabel ? <span className={styles.subLabel}>{subLabel}</span> : null}
      </span>
      {isSelected ? <CheckIcon size={18} className={styles.check} /> : null}
    </button>
  );
}
