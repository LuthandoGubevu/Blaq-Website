import { signIn } from '../api/auth';
import { useAsyncAction } from './useAsync';

export function useSignIn() {
  return useAsyncAction(signIn);
}
