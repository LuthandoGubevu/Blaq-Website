import type { Booking } from '../../../types';
import { MapPinIcon } from '../../../components/icons/MapPinIcon';
import { StatusBadge } from '../../../components/common/StatusBadge';
import { formatDateTimeLine, formatDurationShort } from '../../../utils/formatDate';
import styles from './BookingCard.module.css';

interface BookingCardProps {
  booking: Booking;
  zoneName: string;
}

export function BookingCard({ booking, zoneName }: BookingCardProps) {
  return (
    <article className={styles.card}>
      <p className={styles.dateLine}>{formatDateTimeLine(booking.startsAt)}</p>
      <h3 className={styles.serviceTitle}>{booking.serviceName}</h3>
      <p className={styles.providerLine}>
        <span className={styles.providerLabel}>Provider: </span>
        <span className={styles.providerName}>{booking.providerName}</span>
      </p>
      <p className={styles.zoneLine}>
        <MapPinIcon size={16} />
        {zoneName}
      </p>
      <hr className={styles.divider} />
      <div className={styles.footer}>
        <StatusBadge status={booking.status} />
        <span className={styles.duration}>{formatDurationShort(booking.durationMinutes)}</span>
      </div>
    </article>
  );
}
