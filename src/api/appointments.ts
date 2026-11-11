import type { Appointment } from '../types';
import { USE_MOCKS, simulateDelay } from './config';
import { db, requireCurrentUser } from './mockDb';

/** The signed-in provider's bookings, soonest first. */
export async function getAppointments(): Promise<Appointment[]> {
  if (USE_MOCKS) {
    const { profile } = requireCurrentUser('partner');
    const appointments = db.bookings
      .filter((booking) => booking.providerId === profile.id)
      .sort((a, b) => a.startsAt.localeCompare(b.startsAt))
      .map<Appointment>((booking) => ({
        id: booking.id,
        startsAt: booking.startsAt,
        durationMinutes: booking.durationMinutes,
        service: booking.serviceName,
        clientName: booking.customerName,
        zoneId: booking.zoneId,
        status: booking.status,
      }));
    return simulateDelay(appointments);
  }

  const res = await fetch('/api/appointments');
  if (!res.ok) {
    throw new Error('Unable to load appointments');
  }
  return res.json() as Promise<Appointment[]>;
}
