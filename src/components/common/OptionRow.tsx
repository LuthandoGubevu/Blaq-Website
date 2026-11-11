import { CheckIcon } from '../icons/CheckIcon';
import styles from './OptionRow.module.css';

interface OptionRowProps {
  label: string;
  isSelected: boolean;
  onSelect: () => void;
}

export function OptionRow({ label, isSelected, onSelect }: OptionRowProps) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={isSelected}
      className={styles.row}
      onClick={onSelect}
    >
      <span>{label}</span>
      {isSelected ? <CheckIcon size={18} className={styles.check} /> : null}
    </button>
  );
}
