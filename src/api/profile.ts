import type { Provider } from '../types';
import { USE_MOCKS } from './config';
import { requireCurrentUser } from './mockDb';
import { updateProviderVisibility } from './providers';

/** The signed-in provider changing their own public visibility. */
export async function updateVisibility(isPublic: boolean): Promise<Provider> {
  if (USE_MOCKS) {
    const { profile } = requireCurrentUser('partner');
    return updateProviderVisibility(profile.id, isPublic);
  }

  const res = await fetch('/api/profile/visibility', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isPublic }),
  });
  if (!res.ok) {
    throw new Error('Unable to update visibility');
  }
  return res.json() as Promise<Provider>;
}
