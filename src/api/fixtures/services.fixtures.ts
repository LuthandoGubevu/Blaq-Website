import type { Service } from '../../types';

export const servicesFixture: Service[] = [
  { id: 'svc-1', providerId: 'prov-1', name: 'Hair styling', durationMinutes: 90, price: 450 },
  {
    id: 'svc-2',
    providerId: 'prov-1',
    name: 'Braids & extensions',
    durationMinutes: 180,
    price: 900,
  },
  {
    id: 'svc-3',
    providerId: 'prov-2',
    name: 'Makeup application',
    durationMinutes: 60,
    price: 350,
  },
  { id: 'svc-4', providerId: 'prov-2', name: 'Bridal trial', durationMinutes: 120, price: 700 },
  { id: 'svc-5', providerId: 'prov-3', name: 'Gel manicure', durationMinutes: 45, price: 220 },
  { id: 'svc-6', providerId: 'prov-3', name: 'Acrylic full set', durationMinutes: 90, price: 480 },
  { id: 'svc-7', providerId: 'prov-4', name: 'Classic pedicure', durationMinutes: 45, price: 250 },
  {
    id: 'svc-8',
    providerId: 'prov-5',
    name: 'Deep tissue massage',
    durationMinutes: 60,
    price: 500,
  },
];
