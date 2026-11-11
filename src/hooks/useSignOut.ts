import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../api/auth';
import { useSession } from '../context/SessionContext';

export function useSignOut() {
  const { dispatch } = useSession();
  const navigate = useNavigate();

  return useCallback(() => {
    signOut();
    dispatch({ type: 'SIGN_OUT' });
    navigate('/login');
  }, [dispatch, navigate]);
}
