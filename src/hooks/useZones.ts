import { getZones } from '../api/zones';
import { useAsync } from './useAsync';
import type { Zone } from '../types';

export function useZones() {
  return useAsync<Zone[]>(getZones, []);
}
