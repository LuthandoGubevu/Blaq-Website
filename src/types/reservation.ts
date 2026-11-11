export interface ZoneReservationInput {
  zoneId: string;
  /** ISO date, e.g. 2026-08-22 */
  date: string;
  /** 24h time, e.g. 14:00 */
  startTime: string;
  durationMinutes: number;
}

export interface ZoneReservation {
  id: string;
  zoneId: string;
  zoneName: string;
  date: string;
  startTime: string;
  durationMinutes: number;
  createdAt: string;
}
