import type { SessionUser } from '../types';

export type SessionState =
  | { status: 'signedOut' }
  | { status: 'signingIn' }
  | { status: 'signInError'; message: string }
  | { status: 'signedIn'; user: SessionUser };

export type SessionAction =
  | { type: 'SIGN_IN_START' }
  | { type: 'SIGN_IN_SUCCESS'; user: SessionUser }
  | { type: 'SIGN_IN_FAILURE'; message: string }
  | { type: 'BYPASS_DEMO_LOGIN'; user: SessionUser }
  | { type: 'SIGN_OUT' }
  | { type: 'SET_VISIBILITY'; isPublic: boolean };

export const initialSessionState: SessionState = { status: 'signedOut' };

export function sessionReducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case 'SIGN_IN_START':
      return { status: 'signingIn' };
    case 'SIGN_IN_SUCCESS':
      return { status: 'signedIn', user: action.user };
    case 'SIGN_IN_FAILURE':
      return { status: 'signInError', message: action.message };
    case 'BYPASS_DEMO_LOGIN':
      return { status: 'signedIn', user: action.user };
    case 'SIGN_OUT':
      return { status: 'signedOut' };
    case 'SET_VISIBILITY':
      if (state.status !== 'signedIn' || state.user.role !== 'partner') return state;
      return {
        status: 'signedIn',
        user: { role: 'partner', profile: { ...state.user.profile, isPublic: action.isPublic } },
      };
    default:
      return state;
  }
}
