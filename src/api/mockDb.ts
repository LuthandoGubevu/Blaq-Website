import type { Booking, Customer, Provider, SessionUser, Zone, ZoneReservation } from '../types';
import { adminFixture } from './fixtures/admin.fixtures';
import { bookingsFixture } from './fixtures/bookings.fixtures';
import { customersFixture } from './fixtures/customers.fixtures';
import { providersFixture } from './fixtures/providers.fixtures';
import { servicesFixture } from './fixtures/services.fixtures';
import { zonesFixture } from './fixtures/zones.fixtures';

/**
 * In-memory stand-in for the backend, used while USE_MOCKS is true.
 *
 * Every role reads and writes this one store, so a booking a customer makes shows up on the
 * provider's schedule and in the admin tables, and a visibility or status change made by one
 * role is seen by the others. It resets on page reload.
 */
interface MockDb {
  admin: typeof adminFixture;
  providers: Provider[];
  customers: Customer[];
  services: typeof servicesFixture;
  zones: Zone[];
  bookings: Booking[];
  reservations: ZoneReservation[];
}

export const db: MockDb = {
  admin: adminFixture,
  providers: [...providersFixture],
  customers: [...customersFixture],
  services: servicesFixture,
  zones: [...zonesFixture],
  bookings: [...bookingsFixture],
  reservations: [],
};

/** Demo accounts the mock sign-in resolves to, one per role. */
export const DEMO_CUSTOMER_ID = 'cust-1';
export const DEMO_PROVIDER_ID = 'prov-1';

/** Who the mock API treats as the caller. A real backend derives this from the auth token. */
let currentUser: SessionUser | null = null;

export function setCurrentUser(user: SessionUser | null): void {
  currentUser = user;
}

export function getCurrentUser(): SessionUser | null {
  return currentUser;
}

export function requireCurrentUser<R extends SessionUser['role']>(
  role: R,
): Extract<SessionUser, { role: R }> {
  if (!currentUser || currentUser.role !== role) {
    throw new Error(`Not signed in as ${role}`);
  }
  return currentUser as Extract<SessionUser, { role: R }>;
}
