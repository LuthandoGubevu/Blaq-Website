import { getProviderAvailability } from '../api/providers';
import { useAsync } from './useAsync';
import type { Availability } from '../types';

export function useProviderAvailability(providerId: string | null, date: string | null) {
  return useAsync<Availability | null>(() => {
    if (!providerId || !date) return Promise.resolve(null);
    return getProviderAvailability(providerId, date);
  }, [providerId, date]);
}
