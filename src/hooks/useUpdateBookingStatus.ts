import { updateBookingStatus } from '../api/bookings';
import { useAsyncAction } from './useAsync';

export function useUpdateBookingStatus() {
  return useAsyncAction(updateBookingStatus);
}
