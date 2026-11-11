import { useSessionUser } from '../../../context/SessionContext';
import { useSignOut } from '../../../hooks/useSignOut';
import { Eyebrow } from '../../../components/common/Eyebrow';
import { Button } from '../../../components/common/Button';
import { IdentityCard } from './IdentityCard';
import { CreditsBalanceCard } from './CreditsBalanceCard';
import { SettingsList } from './SettingsList';
import styles from './ProfileScreen.module.css';

const PAYMENT_ROWS = [
  { label: 'Card', value: 'Visa •••• 4242' },
  { label: 'Billing Address', value: 'Cape Town, ZA' },
];

const SETTINGS_ROWS = [
  { label: 'Notifications', value: 'Push, Email' },
  { label: 'Communication', value: 'Email, WhatsApp' },
];

export function ProfileScreen() {
  const user = useSessionUser('customer');
  const handleSignOut = useSignOut();

  if (!user) return null;

  return (
    <div className={styles.screen}>
      <Eyebrow>Profile &amp; Payment</Eyebrow>
      <IdentityCard customer={user.profile} />
      <CreditsBalanceCard creditsBalance={user.profile.creditsBalance} />

      <div>
        <Eyebrow tone="gold" as="h2" className={styles.sectionLabel}>
          Payment Methods
        </Eyebrow>
        <SettingsList rows={PAYMENT_ROWS} />
      </div>

      <div>
        <Eyebrow tone="gold" as="h2" className={styles.sectionLabel}>
          Settings
        </Eyebrow>
        <SettingsList rows={SETTINGS_ROWS} />
      </div>

      <Button variant="outline-muted" fullWidth onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
}
