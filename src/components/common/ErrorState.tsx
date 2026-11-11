import { Eyebrow } from './Eyebrow';
import { Button } from './Button';
import styles from './ErrorState.module.css';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = 'Something went wrong. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className={styles.state} role="alert">
      <Eyebrow tone="gold">Unable to load</Eyebrow>
      <p className={styles.message}>{message}</p>
      {onRetry ? (
        <Button variant="outline-gold" onClick={onRetry}>
          Retry
        </Button>
      ) : null}
    </div>
  );
}
