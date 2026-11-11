import { getProviders } from '../api/providers';
import { useAsync } from './useAsync';
import type { Provider } from '../types';

export function useProviders() {
  return useAsync<Provider[]>(getProviders, []);
}
