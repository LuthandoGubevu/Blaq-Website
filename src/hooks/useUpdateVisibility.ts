import { updateVisibility } from '../api/profile';
import { useAsyncAction } from './useAsync';

export function useUpdateVisibility() {
  return useAsyncAction(updateVisibility);
}
