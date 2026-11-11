import type { DurationOption, Zone, ZoneReservation } from '../types';
import { DEFAULT_DURATION } from '../types';

export type PickerKind = 'none' | 'zone' | 'date' | 'time' | 'duration';

export type BookingState =
  | {
      phase: 'form';
      zone: Zone | null;
      date: string | null;
      startTime: string | null;
      duration: DurationOption;
      activePicker: PickerKind;
      validationError: string | null;
    }
  | {
      phase: 'confirmed';
      reservation: ZoneReservation;
    };

export type BookingAction =
  | { type: 'OPEN_PICKER'; picker: PickerKind }
  | { type: 'CLOSE_PICKER' }
  | { type: 'SELECT_ZONE'; zone: Zone }
  | { type: 'SELECT_DATE'; date: string }
  | { type: 'CLEAR_DATE' }
  | { type: 'SELECT_TIME'; time: string }
  | { type: 'SELECT_DURATION'; duration: DurationOption }
  | { type: 'SET_VALIDATION_ERROR'; message: string; picker: PickerKind }
  | { type: 'CONFIRM_SUCCESS'; reservation: ZoneReservation }
  | { type: 'RESET' };

export const initialFormState: BookingState = {
  phase: 'form',
  zone: null,
  date: null,
  startTime: null,
  duration: DEFAULT_DURATION,
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
    case 'SELECT_ZONE':
      return { ...state, zone: action.zone, activePicker: 'none', validationError: null };
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
    case 'SELECT_DURATION':
      return { ...state, duration: action.duration, activePicker: 'none' };
    case 'SET_VALIDATION_ERROR':
      return { ...state, validationError: action.message, activePicker: action.picker };
    case 'CONFIRM_SUCCESS':
      return { phase: 'confirmed', reservation: action.reservation };
    default:
      return state;
  }
}

export function validateZoneBookingForm(
  state: BookingState,
): { message: string; picker: PickerKind } | null {
  if (state.phase !== 'form') return null;

  if (!state.zone) {
    return { message: 'Select a zone to continue.', picker: 'zone' };
  }
  if (!state.date) {
    return { message: 'Select a date to continue.', picker: 'date' };
  }
  if (!state.startTime) {
    return { message: 'Select a start time to continue.', picker: 'time' };
  }
  return null;
}
