import type { AvailabilitySlot } from '../../types';

const SLOT_TIMES = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) % 1000;
  }
  return hash;
}

/** Deterministic pseudo-random slots for a zone or provider id on a given day. */
export function buildSlotsFixture(resourceId: string, date: string): AvailabilitySlot[] {
  return SLOT_TIMES.map((time) => ({
    time,
    isAvailable: hashString(`${resourceId}-${date}-${time}`) % 3 !== 0,
  }));
}
