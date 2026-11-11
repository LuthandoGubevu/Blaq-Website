import type { BookingStatus } from './status';

export interface BookingInput {
  providerId: string;
  serviceId: string;
  /** ISO date, e.g. 2026-08-22 */
  date: string;
  /** 24h time, e.g. 14:00 */
  startTime: string;
}

/**
 * One booking record, shared by every role: customers see their own, partners see the ones
 * made with them (as appointments), admins see all of them.
 */
export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  providerId: string;
  providerName: string;
  serviceId: string;
  serviceName: string;
  zoneId: string;
  zoneName: string;
  /** ISO 8601 timestamp */
  startsAt: string;
  durationMinutes: number;
  price: number;
  status: BookingStatus;
  createdAt: string;
}
