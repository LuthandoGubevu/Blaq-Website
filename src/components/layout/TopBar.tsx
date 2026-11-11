import { useSessionUser } from '../../context/SessionContext';
import { Eyebrow } from '../common/Eyebrow';
import styles from './TopBar.module.css';

export function TopBar() {
  const user = useSessionUser('admin');

  if (!user) return null;

  return (
    <div className={styles.topBar}>
      <div className={styles.identity}>
        <p className={styles.name}>{user.profile.name}</p>
        <Eyebrow tone="gold">{user.profile.role}</Eyebrow>
      </div>
    </div>
  );
}
