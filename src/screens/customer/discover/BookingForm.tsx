import { useBooking } from '../../../context/BookingContext';
import { useProviders } from '../../../hooks/useProviders';
import { useServicesByProvider } from '../../../hooks/useServicesByProvider';
import { useProviderAvailability } from '../../../hooks/useProviderAvailability';
import { useCreateBooking } from '../../../hooks/useCreateBooking';
import { validateBookingForm } from '../../../context/BookingReducer';
import { PickerTriggerRow } from '../../../components/pickers/PickerTriggerRow';
import { InlineTimeSlotGrid } from '../../../components/pickers/InlineTimeSlotGrid';
import { Button } from '../../../components/common/Button';
import { ProviderField } from './ProviderField';
import { ServiceField } from './ServiceField';
import { DateField } from './DateField';
import styles from './BookingForm.module.css';

export function BookingForm() {
  const { state, dispatch } = useBooking();
  const { data: providers } = useProviders();
  const { data: services } = useServicesByProvider(
    state.phase === 'form' ? (state.provider?.id ?? null) : null,
  );
  const { data: availability, isLoading: availabilityLoading } = useProviderAvailability(
    state.phase === 'form' ? (state.provider?.id ?? null) : null,
    state.phase === 'form' ? state.date : null,
  );
  const { mutate, isLoading: isConfirming } = useCreateBooking();

  if (state.phase !== 'form') return null;

  const canPickService = Boolean(state.provider);
  const canPickTime = Boolean(state.provider && state.date);

  async function handleConfirm() {
    const validation = validateBookingForm(state);
    if (validation) {
      dispatch({
        type: 'SET_VALIDATION_ERROR',
        message: validation.message,
        picker: validation.picker,
      });
      return;
    }
    if (
      state.phase !== 'form' ||
      !state.provider ||
      !state.service ||
      !state.date ||
      !state.startTime
    )
      return;

    const booking = await mutate({
      providerId: state.provider.id,
      serviceId: state.service.id,
      date: state.date,
      startTime: state.startTime,
    });

    if (booking) {
      dispatch({ type: 'CONFIRM_SUCCESS', booking });
    }
  }

  return (
    <div className={styles.panel}>
      <ProviderField
        providers={providers ?? []}
        selectedProvider={state.provider}
        isOpen={state.activePicker === 'provider'}
        onOpen={() => dispatch({ type: 'OPEN_PICKER', picker: 'provider' })}
        onClose={() => dispatch({ type: 'CLOSE_PICKER' })}
        onSelect={(provider) => dispatch({ type: 'SELECT_PROVIDER', provider })}
      />

      <ServiceField
        services={services ?? []}
        selectedService={state.service}
        isOpen={state.activePicker === 'service'}
        onOpen={() => canPickService && dispatch({ type: 'OPEN_PICKER', picker: 'service' })}
        onClose={() => dispatch({ type: 'CLOSE_PICKER' })}
        onSelect={(service) => dispatch({ type: 'SELECT_SERVICE', service })}
        disabled={!canPickService}
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
        {!canPickTime ? <p className={styles.hint}>Select a provider and date first.</p> : null}
      </div>

      {state.activePicker === 'time' && canPickTime ? (
        <InlineTimeSlotGrid
          slots={availability?.slots ?? []}
          selectedTime={state.startTime}
          onSelect={(time) => dispatch({ type: 'SELECT_TIME', time })}
          isLoading={availabilityLoading}
        />
      ) : null}

      {state.validationError ? (
        <p className={styles.errorLine} role="alert">
          {state.validationError}
        </p>
      ) : null}

      <Button variant="primary" fullWidth onClick={handleConfirm} disabled={isConfirming}>
        {isConfirming ? 'Confirming…' : 'Confirm Booking'}
      </Button>
    </div>
  );
}
