import type { Provider } from '../../../types';
import { PersonIcon } from '../../../components/icons/PersonIcon';
import styles from './IdentityCard.module.css';

export function IdentityCard({ provider }: { provider: Provider }) {
  return (
    <div className={styles.card}>
      <div className={styles.avatar}>
        <PersonIcon size={32} />
      </div>
      <h2 className={styles.name}>{provider.name}</h2>
      <p className={styles.code}>ID: {provider.providerCode}</p>
    </div>
  );
}
