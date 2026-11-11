import type { Service } from '../types';
import { USE_MOCKS, simulateDelay } from './config';
import { db } from './mockDb';

export async function getServicesByProvider(providerId: string): Promise<Service[]> {
  if (USE_MOCKS) {
    return simulateDelay(db.services.filter((service) => service.providerId === providerId));
  }

  const res = await fetch(`/api/providers/${providerId}/services`);
  if (!res.ok) {
    throw new Error('Unable to load services');
  }
  return res.json() as Promise<Service[]>;
}
