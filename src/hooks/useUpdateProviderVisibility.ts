import { updateProviderVisibility } from '../api/providers';
import { useAsyncAction } from './useAsync';

export function useUpdateProviderVisibility() {
  return useAsyncAction(updateProviderVisibility);
}
