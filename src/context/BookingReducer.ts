import type { Booking, Provider, Service } from '../types';

export type PickerKind = 'none' | 'provider' | 'service' | 'date' | 'time';

export type BookingState =
  | {
      phase: 'form';
      provider: Provider | null;
      service: Service | null;
      date: string | null;
      startTime: string | null;
      activePicker: PickerKind;
      validationError: string | null;
    }
  | {
      phase: 'confirmed';
      booking: Booking;
    };

export type BookingAction =
  | { type: 'OPEN_PICKER'; picker: PickerKind }
  | { type: 'CLOSE_PICKER' }
  | { type: 'SELECT_PROVIDER'; provider: Provider }
  | { type: 'SELECT_SERVICE'; service: Service }
  | { type: 'SELECT_DATE'; date: string }
  | { type: 'CLEAR_DATE' }
  | { type: 'SELECT_TIME'; time: string }
  | { type: 'SET_VALIDATION_ERROR'; message: string; picker: PickerKind }
  | { type: 'CONFIRM_SUCCESS'; booking: Booking }
  | { type: 'RESET' };

export const initialFormState: BookingState = {
  phase: 'form',
  provider: null,
  service: null,
  date: null,
  startTime: null,
  activePicker: 'none',
  validationError: null,
};

export function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  if (action.type === 'RESET') {
    return initialFormState;
  }

  if (state.phase !== 'form') {
    return state;
  }

  switch (action.type) {
    case 'OPEN_PICKER':
      return { ...state, activePicker: action.picker, validationError: null };
    case 'CLOSE_PICKER':
      return { ...state, activePicker: 'none' };
    case 'SELECT_PROVIDER':
      return {
        ...state,
        provider: action.provider,
        service: null,
        date: null,
        startTime: null,
        activePicker: 'none',
        validationError: null,
      };
    case 'SELECT_SERVICE':
      return { ...state, service: action.service, activePicker: 'none', validationError: null };
    case 'SELECT_DATE':
      return {
        ...state,
        date: action.date,
        startTime: null,
        activePicker: 'none',
        validationError: null,
      };
    case 'CLEAR_DATE':
      return { ...state, date: null, startTime: null };
    case 'SELECT_TIME':
      return { ...state, startTime: action.time, activePicker: 'none', validationError: null };
    case 'SET_VALIDATION_ERROR':
      return { ...state, validationError: action.message, activePicker: action.picker };
    case 'CONFIRM_SUCCESS':
      return { phase: 'confirmed', booking: action.booking };
    default:
      return state;
  }
}

export function validateBookingForm(
  state: BookingState,
): { message: string; picker: PickerKind } | null {
  if (state.phase !== 'form') return null;

  if (!state.provider) {
    return { message: 'Select a provider to continue.', picker: 'provider' };
  }
  if (!state.service) {
    return { message: 'Select a service to continue.', picker: 'service' };
  }
  if (!state.date) {
    return { message: 'Select a date to continue.', picker: 'date' };
  }
  if (!state.startTime) {
    return { message: 'Select a start time to continue.', picker: 'time' };
  }
  return null;
}
