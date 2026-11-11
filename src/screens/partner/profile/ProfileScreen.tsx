import { useSessionUser } from '../../../context/SessionContext';
import { useSignOut } from '../../../hooks/useSignOut';
import { Eyebrow } from '../../../components/common/Eyebrow';
import { Button } from '../../../components/common/Button';
import { VisibilityToggleCard } from './VisibilityToggleCard';
import { IdentityCard } from './IdentityCard';
import { SettingsList } from './SettingsList';
import styles from './ProfileScreen.module.css';

export function ProfileScreen() {
  const user = useSessionUser('partner');
  const handleSignOut = useSignOut();

  if (!user) return null;

  return (
    <div className={styles.screen}>
      <Eyebrow>Profile &amp; Settings</Eyebrow>
      <VisibilityToggleCard />
      <IdentityCard provider={user.profile} />
      <SettingsList />
      <Button variant="outline-muted" fullWidth onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
}
