import type { AppointmentStatus } from './status';

/** A booking as the provider sees it on their schedule. */
export interface Appointment {
  id: string;
  /** ISO 8601 timestamp */
  startsAt: string;
  durationMinutes: number;
  service: string;
  clientName: string;
  zoneId: string;
  status: AppointmentStatus;
}
