import { getServicesByProvider } from '../api/services';
import { useAsync } from './useAsync';
import type { Service } from '../types';

export function useServicesByProvider(providerId: string | null) {
  return useAsync<Service[]>(() => {
    if (!providerId) return Promise.resolve([]);
    return getServicesByProvider(providerId);
  }, [providerId]);
}
