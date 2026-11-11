import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useSession } from '../context/SessionContext';
import { ROLE_DISPLAY_MAP } from '../types';
import type { UserRole } from '../types';

/** Lets a signed-in user of the given role through; anyone else is sent where they belong. */
export function ProtectedRoute({ allow, children }: { allow: UserRole; children: ReactNode }) {
  const { state } = useSession();

  if (state.status !== 'signedIn') {
    return <Navigate to="/login" replace />;
  }
  if (state.user.role !== allow) {
    return <Navigate to={ROLE_DISPLAY_MAP[state.user.role].homePath} replace />;
  }

  return <>{children}</>;
}
