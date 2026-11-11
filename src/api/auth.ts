import type { SessionUser, UserRole } from '../types';
import { USE_MOCKS, simulateDelay } from './config';
import { DEMO_CUSTOMER_ID, DEMO_PROVIDER_ID, db, setCurrentUser } from './mockDb';

/**
 * The demo account for a role, read from the shared mock store so it reflects any changes made
 * earlier in the session (e.g. an admin hiding the provider).
 */
export function getDemoUser(role: UserRole): SessionUser {
  let user: SessionUser;
  if (role === 'customer') {
    const profile = db.customers.find((c) => c.id === DEMO_CUSTOMER_ID);
    if (!profile) throw new Error('Demo customer missing');
    user = { role, profile };
  } else if (role === 'partner') {
    const profile = db.providers.find((p) => p.id === DEMO_PROVIDER_ID);
    if (!profile) throw new Error('Demo provider missing');
    user = { role, profile };
  } else {
    user = { role, profile: db.admin };
  }
  setCurrentUser(user);
  return user;
}

/**
 * With mocks on, the role chosen on the login screen decides which demo account is returned.
 * A real backend should work the role out from the account and ignore the hint.
 */
export async function signIn(
  email: string,
  password: string,
  role: UserRole,
): Promise<SessionUser> {
  if (USE_MOCKS) {
    return simulateDelay(getDemoUser(role));
  }

  const res = await fetch('/api/auth/sign-in', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role }),
  });
  if (!res.ok) {
    throw new Error('Unable to sign in');
  }
  return res.json() as Promise<SessionUser>;
}

export function signOut(): void {
  setCurrentUser(null);
}
