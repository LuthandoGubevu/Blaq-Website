import type { AvailabilitySlot } from '../../types';
import styles from './InlineTimeSlotGrid.module.css';

interface InlineTimeSlotGridProps {
  slots: AvailabilitySlot[];
  selectedTime: string | null;
  onSelect: (time: string) => void;
  isLoading: boolean;
}

export function InlineTimeSlotGrid({
  slots,
  selectedTime,
  onSelect,
  isLoading,
}: InlineTimeSlotGridProps) {
  if (isLoading) {
    return (
      <div className={styles.grid}>
        <p className={styles.message}>Loading available times…</p>
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className={styles.grid}>
        <p className={styles.message}>No time slots available for this date.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid} role="listbox" aria-label="Select start time">
      {slots.map((slot) => {
        const selected = slot.time === selectedTime;
        const classes = [
          styles.slot,
          !slot.isAvailable ? styles.slotUnavailable : '',
          selected ? styles.slotSelected : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button
            key={slot.time}
            type="button"
            role="option"
            aria-selected={selected}
            className={classes}
            disabled={!slot.isAvailable}
            onClick={() => onSelect(slot.time)}
          >
            {slot.time}
          </button>
        );
      })}
    </div>
  );
}
