import { format, parseISO } from 'date-fns';

/** "2026-08-15 · 10:00" */
export function formatDateTimeLine(startsAt: string): string {
  return format(parseISO(startsAt), 'yyyy-MM-dd · HH:mm');
}

/** 90 -> "1H 30M", 60 -> "1H", 45 -> "45MIN" */
export function formatDurationShort(durationMinutes: number): string {
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  if (hours === 0) return `${minutes}MIN`;
  if (minutes === 0) return `${hours}H`;
  return `${hours}H ${minutes}M`;
}

/**
 * "Sat 22 August 2026 · 14:00 · 2 Hours" — the trailing label is a duration for zone
 * reservations and a service name for customer bookings.
 */
export function formatSelectionSummary(date: string, startTime: string, label: string): string {
  const dateLabel = format(parseISO(date), 'EEE d MMMM yyyy');
  return `${dateLabel} · ${startTime} · ${label}`;
}

/** "August 2026" */
export function formatMonthYear(date: Date): string {
  return format(date, 'MMMM yyyy');
}

/** ISO date (yyyy-MM-dd) for a Date, used for calendar day selection */
export function toISODateString(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}
