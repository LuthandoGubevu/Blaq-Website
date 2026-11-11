import { getCustomers } from '../api/customers';
import { useAsync } from './useAsync';
import type { Customer } from '../types';

export function useCustomers() {
  return useAsync<Customer[]>(getCustomers, []);
}
