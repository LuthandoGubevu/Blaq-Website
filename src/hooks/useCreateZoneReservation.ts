import { createZoneReservation } from '../api/reservations';
import { useAsyncAction } from './useAsync';

export function useCreateZoneReservation() {
  return useAsyncAction(createZoneReservation);
}
