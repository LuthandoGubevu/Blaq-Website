import { getZoneAvailability } from '../api/zones';
import { useAsync } from './useAsync';
import type { Availability } from '../types';

export function useZoneAvailability(zoneId: string | null, date: string | null) {
  return useAsync<Availability | null>(() => {
    if (!zoneId || !date) return Promise.resolve(null);
    return getZoneAvailability(zoneId, date);
  }, [zoneId, date]);
}
