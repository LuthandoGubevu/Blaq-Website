import { createContext, useContext, useReducer } from 'react';
import type { ReactNode, Dispatch } from 'react';
import type { SessionUser, UserRole } from '../types';
import type { SessionAction, SessionState } from './SessionReducer';
import { initialSessionState, sessionReducer } from './SessionReducer';

interface SessionContextValue {
  state: SessionState;
  dispatch: Dispatch<SessionAction>;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(sessionReducer, initialSessionState);
  return <SessionContext.Provider value={{ state, dispatch }}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionContextValue {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}

/** The signed-in user if they hold the given role, otherwise null. */
export function useSessionUser<R extends UserRole>(
  role: R,
): Extract<SessionUser, { role: R }> | null {
  const { state } = useSession();
  if (state.status !== 'signedIn' || state.user.role !== role) {
    return null;
  }
  return state.user as Extract<SessionUser, { role: R }>;
}
