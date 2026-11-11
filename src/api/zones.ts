import type { Availability, Zone } from '../types';
import { USE_MOCKS, simulateDelay } from './config';
import { buildSlotsFixture } from './fixtures/availability.fixtures';
import { db } from './mockDb';

export async function getZones(): Promise<Zone[]> {
  if (USE_MOCKS) {
    return simulateDelay(db.zones);
  }

  const res = await fetch('/api/zones');
  if (!res.ok) {
    throw new Error('Unable to load zones');
  }
  return res.json() as Promise<Zone[]>;
}

export async function getZoneAvailability(zoneId: string, date: string): Promise<Availability> {
  if (USE_MOCKS) {
    return simulateDelay({ zoneId, date, slots: buildSlotsFixture(zoneId, date) });
  }

  const res = await fetch(`/api/zones/${zoneId}/availability?date=${date}`);
  if (!res.ok) {
    throw new Error('Unable to load zone availability');
  }
  return res.json() as Promise<Availability>;
}
