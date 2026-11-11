import type { Zone } from '../../types';

export const zonesFixture: Zone[] = [
  { id: 'zone-1', name: 'Zone 1: Makeup Station', seatsTotal: 4, seatsAvailable: 2 },
  { id: 'zone-2', name: 'Zone 2: Hair Station', seatsTotal: 4, seatsAvailable: 2 },
  { id: 'zone-3', name: 'Zone 3: Pedicure Station', seatsTotal: 3, seatsAvailable: 1 },
  { id: 'zone-4', name: 'Zone 4: Nails Station', seatsTotal: 3, seatsAvailable: 3 },
  { id: 'zone-5', name: 'Zone 5: Fashion Closet', seatsTotal: 2, seatsAvailable: 0 },
  { id: 'zone-6', name: 'Zone 6: Wellness Studio', seatsTotal: 2, seatsAvailable: 2 },
  { id: 'zone-7', name: 'Zone 7: Photography Studio', seatsTotal: 1, seatsAvailable: 1 },
  {
    id: 'zone-8',
    name: 'Zone 8: Production Hub (Podcast Studio)',
    seatsTotal: 1,
    seatsAvailable: 0,
  },
];
