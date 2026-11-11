import type { Customer } from '../../../types';
import { PersonIcon } from '../../../components/icons/PersonIcon';
import styles from './IdentityCard.module.css';

export function IdentityCard({ customer }: { customer: Customer }) {
  return (
    <div className={styles.card}>
      <div className={styles.avatar}>
        <PersonIcon size={32} />
      </div>
      <h2 className={styles.name}>{customer.name}</h2>
      <p className={styles.code}>ID: {customer.customerCode}</p>
    </div>
  );
}
