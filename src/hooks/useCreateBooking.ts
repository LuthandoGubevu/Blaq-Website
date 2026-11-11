import { createBooking } from '../api/bookings';
import { useAsyncAction } from './useAsync';

export function useCreateBooking() {
  return useAsyncAction(createBooking);
}
