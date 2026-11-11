import type { Booking, BookingInput, BookingStatus } from '../types';
import { USE_MOCKS, simulateDelay } from './config';
import { db, getCurrentUser, requireCurrentUser } from './mockDb';

/** A customer gets their own bookings; an admin gets every booking. Newest first. */
export async function getBookings(): Promise<Booking[]> {
  if (USE_MOCKS) {
    const user = getCurrentUser();
    const visible =
      user?.role === 'customer'
        ? db.bookings.filter((booking) => booking.customerId === user.profile.id)
        : db.bookings;
    return simulateDelay([...visible].sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
  }

  const res = await fetch('/api/bookings');
  if (!res.ok) {
    throw new Error('Unable to load bookings');
  }
  return res.json() as Promise<Booking[]>;
}

export async function createBooking(input: BookingInput): Promise<Booking> {
  if (USE_MOCKS) {
    const { profile: customer } = requireCurrentUser('customer');
    const provider = db.providers.find((p) => p.id === input.providerId);
    const service = db.services.find((s) => s.id === input.serviceId);
    if (!provider || !service || service.providerId !== provider.id) {
      throw new Error('Provider or service not found');
    }
    if (!provider.isPublic) {
      throw new Error('This provider is not taking bookings');
    }
    const booking: Booking = {
      id: `booking-${Date.now()}`,
      customerId: customer.id,
      customerName: customer.name,
      providerId: provider.id,
      providerName: provider.name,
      serviceId: service.id,
      serviceName: service.name,
      zoneId: provider.zoneId,
      zoneName: provider.zoneName,
      startsAt: `${input.date}T${input.startTime}:00`,
      durationMinutes: service.durationMinutes,
      price: service.price,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    db.bookings = [...db.bookings, booking];
    return simulateDelay(booking);
  }

  const res = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    throw new Error('Unable to create booking');
  }
  return res.json() as Promise<Booking>;
}

export async function updateBookingStatus(
  bookingId: string,
  status: BookingStatus,
): Promise<Booking> {
  if (USE_MOCKS) {
    const existing = db.bookings.find((booking) => booking.id === bookingId);
    if (!existing) {
      throw new Error('Booking not found');
    }
    const updated = { ...existing, status };
    db.bookings = db.bookings.map((booking) => (booking.id === bookingId ? updated : booking));
    return simulateDelay(updated);
  }

  const res = await fetch(`/api/bookings/${bookingId}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) {
    throw new Error('Unable to update booking status');
  }
  return res.json() as Promise<Booking>;
}
