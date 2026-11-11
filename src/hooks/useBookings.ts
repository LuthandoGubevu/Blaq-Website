import { getBookings } from '../api/bookings';
import { useAsync } from './useAsync';
import type { Booking } from '../types';

export function useBookings() {
  return useAsync<Booking[]>(getBookings, []);
}
