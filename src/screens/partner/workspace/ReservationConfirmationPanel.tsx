import type { ZoneReservation } from '../../../types';
import { useZoneBooking } from '../../../context/ZoneBookingContext';
import { Eyebrow } from '../../../components/common/Eyebrow';
import { Button } from '../../../components/common/Button';
import { formatSelectionSummary } from '../../../utils/formatDate';
import { DURATION_OPTIONS } from '../../../types';
import styles from './ReservationConfirmationPanel.module.css';

export function ReservationConfirmationPanel({ reservation }: { reservation: ZoneReservation }) {
  const { dispatch } = useZoneBooking();
  const durationLabel =
    DURATION_OPTIONS.find((option) => option.minutes === reservation.durationMinutes)?.label ??
    `${reservation.durationMinutes} min`;

  return (
    <div className={styles.panel}>
      <Eyebrow tone="gold">Zone Reserved</Eyebrow>
      <h2 className={styles.zoneName}>{reservation.zoneName}</h2>
      <p className={styles.summaryLine}>
        {formatSelectionSummary(reservation.date, reservation.startTime, durationLabel)}
      </p>
      <Button
        variant="outline-gold"
        className={styles.resetButton}
        onClick={() => dispatch({ type: 'RESET' })}
      >
        Reserve Another
      </Button>
    </div>
  );
}
