import type { ZoneReservation, ZoneReservationInput } from '../types';
import { USE_MOCKS, simulateDelay } from './config';
import { db } from './mockDb';

export async function createZoneReservation(input: ZoneReservationInput): Promise<ZoneReservation> {
  if (USE_MOCKS) {
    const zone = db.zones.find((z) => z.id === input.zoneId);
    const reservation: ZoneReservation = {
      id: `res-${Date.now()}`,
      zoneId: input.zoneId,
      zoneName: zone?.name ?? 'Reserved Zone',
      date: input.date,
      startTime: input.startTime,
      durationMinutes: input.durationMinutes,
      createdAt: new Date().toISOString(),
    };
    db.reservations = [...db.reservations, reservation];
    return simulateDelay(reservation);
  }

  const res = await fetch('/api/zone-reservations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    throw new Error('Unable to create reservation');
  }
  return res.json() as Promise<ZoneReservation>;
}
