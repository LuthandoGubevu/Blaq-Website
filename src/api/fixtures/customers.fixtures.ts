import type { Customer } from '../../types';

export const customersFixture: Customer[] = [
  {
    id: 'cust-1',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@example.com',
    customerCode: 'BLAQ-CUST-3021',
    creditsBalance: 18,
  },
  {
    id: 'cust-2',
    name: 'Nomvula Dlamini',
    email: 'nomvula.d@example.com',
    customerCode: 'BLAQ-CUST-3022',
    creditsBalance: 6,
  },
  {
    id: 'cust-3',
    name: 'Tariro Moyo',
    email: 'tariro.moyo@example.com',
    customerCode: 'BLAQ-CUST-3023',
    creditsBalance: 24,
  },
  {
    id: 'cust-4',
    name: 'Lindiwe Khumalo',
    email: 'lindiwe.k@example.com',
    customerCode: 'BLAQ-CUST-3024',
    creditsBalance: 0,
  },
];
