import styles from './VisibilityBadge.module.css';

interface VisibilityBadgeProps {
  isPublic: boolean;
  onClick: () => void;
}

export function VisibilityBadge({ isPublic, onClick }: VisibilityBadgeProps) {
  return (
    <button
      type="button"
      className={`${styles.badge} ${isPublic ? styles.public : styles.hidden}`}
      onClick={onClick}
    >
      {isPublic ? 'Public' : 'Hidden'}
    </button>
  );
}
