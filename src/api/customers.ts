import type { Customer } from '../types';
import { USE_MOCKS, simulateDelay } from './config';
import { db } from './mockDb';

export async function getCustomers(): Promise<Customer[]> {
  if (USE_MOCKS) {
    return simulateDelay(db.customers);
  }

  const res = await fetch('/api/customers');
  if (!res.ok) {
    throw new Error('Unable to load customers');
  }
  return res.json() as Promise<Customer[]>;
}
