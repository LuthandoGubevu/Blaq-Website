import { createContext, useContext, useReducer } from 'react';
import type { Dispatch, ReactNode } from 'react';
import type { BookingAction, BookingState } from './ZoneBookingReducer';
import { bookingReducer, initialFormState } from './ZoneBookingReducer';

interface BookingContextValue {
  state: BookingState;
  dispatch: Dispatch<BookingAction>;
}

const ZoneBookingContext = createContext<BookingContextValue | null>(null);

export function ZoneBookingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, initialFormState);
  return (
    <ZoneBookingContext.Provider value={{ state, dispatch }}>
      {children}
    </ZoneBookingContext.Provider>
  );
}

export function useZoneBooking(): BookingContextValue {
  const context = useContext(ZoneBookingContext);
  if (!context) {
    throw new Error('useZoneBooking must be used within a ZoneBookingProvider');
  }
  return context;
}
