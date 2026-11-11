import { STATUS_DISPLAY_MAP } from '../../types';
import type { BookingStatus } from '../../types';
import { CheckCircleIcon } from '../icons/CheckCircleIcon';
import styles from './StatusBadge.module.css';

interface StatusBadgeProps {
  status: BookingStatus;
  onClick?: () => void;
}

export function StatusBadge({ status, onClick }: StatusBadgeProps) {
  const display = STATUS_DISPLAY_MAP[status];
  const content = (
    <>
      {status === 'confirmed' ? <CheckCircleIcon size={16} /> : null}
      {display.label}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        className={`${styles.badge} ${styles.badgeButton}`}
        style={{ color: display.colorVar }}
        onClick={onClick}
      >
        {content}
      </button>
    );
  }

  return (
    <span className={styles.badge} style={{ color: display.colorVar }}>
      {content}
    </span>
  );
}
