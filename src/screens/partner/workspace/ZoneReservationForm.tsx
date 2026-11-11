import { useZoneBooking } from '../../../context/ZoneBookingContext';
import { useZones } from '../../../hooks/useZones';
import { useZoneAvailability } from '../../../hooks/useZoneAvailability';
import { useCreateZoneReservation } from '../../../hooks/useCreateZoneReservation';
import { validateZoneBookingForm } from '../../../context/ZoneBookingReducer';
import { PickerTriggerRow } from '../../../components/pickers/PickerTriggerRow';
import { DurationPickerSheet } from '../../../components/pickers/DurationPickerSheet';
import { InlineTimeSlotGrid } from '../../../components/pickers/InlineTimeSlotGrid';
import { Button } from '../../../components/common/Button';
import { ZoneField } from './ZoneField';
import { DateField } from './DateField';
import styles from './ZoneReservationForm.module.css';

export function ZoneReservationForm() {
  const { state, dispatch } = useZoneBooking();
  const { data: zones } = useZones();
  const { data: availability, isLoading: availabilityLoading } = useZoneAvailability(
    state.phase === 'form' ? (state.zone?.id ?? null) : null,
    state.phase === 'form' ? state.date : null,
  );
  const { mutate, isLoading: isConfirming } = useCreateZoneReservation();

  if (state.phase !== 'form') return null;

  const canPickTime = Boolean(state.zone && state.date);

  async function handleConfirm() {
    const validation = validateZoneBookingForm(state);
    if (validation) {
      dispatch({
        type: 'SET_VALIDATION_ERROR',
        message: validation.message,
        picker: validation.picker,
      });
      return;
    }
    if (state.phase !== 'form' || !state.zone || !state.date || !state.startTime) return;

    const reservation = await mutate({
      zoneId: state.zone.id,
      date: state.date,
      startTime: state.startTime,
      durationMinutes: state.duration.minutes,
    });

    if (reservation) {
      dispatch({ type: 'CONFIRM_SUCCESS', reservation });
    }
  }

  return (
    <div className={styles.panel}>
      <ZoneField
        zones={zones ?? []}
        selectedZone={state.zone}
        isOpen={state.activePicker === 'zone'}
        onOpen={() => dispatch({ type: 'OPEN_PICKER', picker: 'zone' })}
        onClose={() => dispatch({ type: 'CLOSE_PICKER' })}
        onSelect={(zone) => dispatch({ type: 'SELECT_ZONE', zone })}
      />

      <DateField
        selectedDate={state.date}
        isOpen={state.activePicker === 'date'}
        onToggle={() =>
          dispatch({ type: 'OPEN_PICKER', picker: state.activePicker === 'date' ? 'none' : 'date' })
        }
        onSelect={(date) => dispatch({ type: 'SELECT_DATE', date })}
        onClear={() => dispatch({ type: 'CLEAR_DATE' })}
      />

      <div className={styles.row}>
        <div>
          <PickerTriggerRow
            label="Start Time"
            placeholder="--:--"
            value={state.startTime}
            onClick={() =>
              canPickTime &&
              dispatch({
                type: 'OPEN_PICKER',
                picker: state.activePicker === 'time' ? 'none' : 'time',
              })
            }
            isOpen={state.activePicker === 'time'}
            ariaHasPopup="listbox"
          />
          {!canPickTime ? <p className={styles.hint}>Select a zone and date first.</p> : null}
        </div>
        <PickerTriggerRow
          label="Duration"
          placeholder="Select…"
          value={state.duration.label}
          onClick={() => dispatch({ type: 'OPEN_PICKER', picker: 'duration' })}
          isOpen={state.activePicker === 'duration'}
          ariaHasPopup="listbox"
        />
      </div>

      {state.activePicker === 'time' && canPickTime ? (
        <InlineTimeSlotGrid
          slots={availability?.slots ?? []}
          selectedTime={state.startTime}
          onSelect={(time) => dispatch({ type: 'SELECT_TIME', time })}
          isLoading={availabilityLoading}
        />
      ) : null}

      <DurationPickerSheet
        isOpen={state.activePicker === 'duration'}
        onClose={() => dispatch({ type: 'CLOSE_PICKER' })}
        selectedDurationId={state.duration.id}
        onSelect={(duration) => dispatch({ type: 'SELECT_DURATION', duration })}
      />

      {state.validationError ? (
        <p className={styles.errorLine} role="alert">
          {state.validationError}
        </p>
      ) : null}

      <Button variant="primary" fullWidth onClick={handleConfirm} disabled={isConfirming}>
        {isConfirming ? 'Confirming…' : 'Confirm Reservation'}
      </Button>
    </div>
  );
}
