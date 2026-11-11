import { Skeleton } from '../../../components/common/Skeleton';
import styles from './BookingCard.module.css';

export function BookingCardSkeleton() {
  return (
    <div className={styles.card} aria-hidden="true">
      <Skeleton width={120} height={11} />
      <Skeleton width="70%" height={23} />
      <Skeleton width="50%" height={14} />
      <Skeleton width="40%" height={14} />
      <hr className={styles.divider} />
      <div className={styles.footer}>
        <Skeleton width={90} height={12} />
        <Skeleton width={50} height={12} />
      </div>
    </div>
  );
}
