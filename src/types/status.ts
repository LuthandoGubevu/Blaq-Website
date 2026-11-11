export type BookingStatus = 'confirmed' | 'pending' | 'cancelled';

/** Partner-facing name for the same status values. */
export type AppointmentStatus = BookingStatus;

export interface StatusDisplay {
  label: string;
  colorVar: string;
}

export const STATUS_DISPLAY_MAP: Record<BookingStatus, StatusDisplay> = {
  confirmed: { label: 'CONFIRMED', colorVar: 'var(--blaq-success)' },
  pending: { label: 'PENDING', colorVar: 'var(--blaq-gold)' },
  cancelled: { label: 'CANCELLED', colorVar: 'var(--blaq-error)' },
};

export const BOOKING_STATUS_OPTIONS: BookingStatus[] = ['confirmed', 'pending', 'cancelled'];
