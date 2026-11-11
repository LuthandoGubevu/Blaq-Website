import { useSession } from '../../context/SessionContext';
import { useSignOut } from '../../hooks/useSignOut';
import type { UserRole } from '../../types';
import { Eyebrow } from '../common/Eyebrow';
import { SignOutIcon } from '../icons/SignOutIcon';
import styles from './Header.module.css';

const ROLE_EYEBROW: Record<UserRole, string> = {
  customer: 'BLAQ Customer',
  partner: 'Service Provider',
  admin: 'Admin',
};

export function Header() {
  const { state } = useSession();
  const signOut = useSignOut();

  if (state.status !== 'signedIn') {
    return null;
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.identity}>
          <p className={styles.name}>{state.user.profile.name}</p>
          <Eyebrow tone="gold">{ROLE_EYEBROW[state.user.role]}</Eyebrow>
        </div>
        <button
          type="button"
          className={styles.signOutButton}
          onClick={signOut}
          aria-label="Sign out"
        >
          <SignOutIcon />
        </button>
      </div>
    </header>
  );
}
