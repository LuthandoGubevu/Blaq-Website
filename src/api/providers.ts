import type { Availability, Provider } from '../types';
import { USE_MOCKS, simulateDelay } from './config';
import { buildSlotsFixture } from './fixtures/availability.fixtures';
import { db, getCurrentUser, setCurrentUser } from './mockDb';

/** Customers only get providers who are publicly visible; admins get everyone. */
export async function getProviders(): Promise<Provider[]> {
  if (USE_MOCKS) {
    const isCustomer = getCurrentUser()?.role === 'customer';
    return simulateDelay(isCustomer ? db.providers.filter((p) => p.isPublic) : db.providers);
  }

  const res = await fetch('/api/providers');
  if (!res.ok) {
    throw new Error('Unable to load providers');
  }
  return res.json() as Promise<Provider[]>;
}

export async function getProviderAvailability(
  providerId: string,
  date: string,
): Promise<Availability> {
  if (USE_MOCKS) {
    const bookedTimes = new Set(
      db.bookings
        .filter(
          (booking) =>
            booking.providerId === providerId &&
            booking.status !== 'cancelled' &&
            booking.startsAt.startsWith(date),
        )
        .map((booking) => booking.startsAt.slice(11, 16)),
    );
    const slots = buildSlotsFixture(providerId, date).map((slot) => ({
      ...slot,
      isAvailable: slot.isAvailable && !bookedTimes.has(slot.time),
    }));
    return simulateDelay({ providerId, date, slots });
  }

  const res = await fetch(`/api/providers/${providerId}/availability?date=${date}`);
  if (!res.ok) {
    throw new Error('Unable to load provider availability');
  }
  return res.json() as Promise<Availability>;
}

/** Used by admins for any provider, and by a provider for themselves (see profile.ts). */
export async function updateProviderVisibility(
  providerId: string,
  isPublic: boolean,
): Promise<Provider> {
  if (USE_MOCKS) {
    const existing = db.providers.find((provider) => provider.id === providerId);
    if (!existing) {
      throw new Error('Provider not found');
    }
    const updated = { ...existing, isPublic };
    db.providers = db.providers.map((provider) =>
      provider.id === providerId ? updated : provider,
    );
    const user = getCurrentUser();
    if (user?.role === 'partner' && user.profile.id === providerId) {
      setCurrentUser({ role: 'partner', profile: updated });
    }
    return simulateDelay(updated);
  }

  const res = await fetch(`/api/providers/${providerId}/visibility`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isPublic }),
  });
  if (!res.ok) {
    throw new Error('Unable to update provider visibility');
  }
  return res.json() as Promise<Provider>;
}
