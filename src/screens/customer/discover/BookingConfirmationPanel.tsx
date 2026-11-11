import type { Booking } from '../../../types';
import { useBooking } from '../../../context/BookingContext';
import { Eyebrow } from '../../../components/common/Eyebrow';
import { Button } from '../../../components/common/Button';
import { formatSelectionSummary } from '../../../utils/formatDate';
import styles from './BookingConfirmationPanel.module.css';

export function BookingConfirmationPanel({ booking }: { booking: Booking }) {
  const { dispatch } = useBooking();
  const date = booking.startsAt.slice(0, 10);
  const startTime = booking.startsAt.slice(11, 16);

  return (
    <div className={styles.panel}>
      <Eyebrow tone="gold">Booking Confirmed</Eyebrow>
      <h2 className={styles.serviceName}>{booking.serviceName}</h2>
      <p className={styles.summaryLine}>
        {formatSelectionSummary(date, startTime, booking.providerName)}
      </p>
      <p className={styles.summaryLine}>R{booking.price}</p>
      <Button
        variant="outline-gold"
        className={styles.resetButton}
        onClick={() => dispatch({ type: 'RESET' })}
      >
        Book Another
      </Button>
    </div>
  );
}
