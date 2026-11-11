import { getAppointments } from '../api/appointments';
import { useAsync } from './useAsync';
import type { Appointment } from '../types';

export function useAppointments() {
  return useAsync<Appointment[]>(getAppointments, []);
}
