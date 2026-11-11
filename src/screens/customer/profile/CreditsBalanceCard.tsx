import { Eyebrow } from '../../../components/common/Eyebrow';
import { WalletIcon } from '../../../components/icons/WalletIcon';
import styles from './CreditsBalanceCard.module.css';

export function CreditsBalanceCard({ creditsBalance }: { creditsBalance: number }) {
  return (
    <div className={styles.card}>
      <div className={styles.labelGroup}>
        <Eyebrow>PAYU Credits</Eyebrow>
        <p className={styles.status}>Use credits toward eligible facility bookings.</p>
      </div>
      <div className={styles.balanceGroup}>
        <WalletIcon size={20} />
        <span className={styles.balance}>{creditsBalance}</span>
      </div>
    </div>
  );
}
