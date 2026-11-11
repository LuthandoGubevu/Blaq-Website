import { useSession, useSessionUser } from '../../../context/SessionContext';
import { useUpdateVisibility } from '../../../hooks/useUpdateVisibility';
import styles from './VisibilityToggleCard.module.css';

export function VisibilityToggleCard() {
  const { dispatch } = useSession();
  const user = useSessionUser('partner');
  const { mutate } = useUpdateVisibility();

  if (!user) return null;

  const isPublic = user.profile.isPublic;

  async function handleToggle() {
    dispatch({ type: 'SET_VISIBILITY', isPublic: !isPublic });
    const provider = await mutate(!isPublic);
    if (!provider) {
      dispatch({ type: 'SET_VISIBILITY', isPublic });
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.row}>
        <span className={styles.label}>Public Visibility</span>
        <button
          type="button"
          role="switch"
          aria-checked={isPublic}
          aria-label="Public visibility"
          className={`${styles.track} ${isPublic ? styles.trackOn : ''}`}
          onClick={handleToggle}
        >
          <span className={styles.knob} />
        </button>
      </div>
      <p className={styles.status}>
        {isPublic
          ? 'You are currently listed as AVAILABLE to receive new bookings.'
          : 'You are HIDDEN from the directory and cannot receive new bookings.'}
      </p>
    </div>
  );
}
