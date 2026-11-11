import { Eyebrow } from './Eyebrow';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  title: string;
  message: string;
}

export function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <div className={styles.state}>
      <Eyebrow tone="gold">{title}</Eyebrow>
      <p className={styles.message}>{message}</p>
    </div>
  );
}
