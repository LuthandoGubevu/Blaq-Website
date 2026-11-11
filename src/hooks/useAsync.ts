import { useCallback, useEffect, useRef, useState } from 'react';

interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

/** Fetch-on-mount (and on dep change) hook shape used by read hooks like useBookings. */
export function useAsync<T>(fn: () => Promise<T>, deps: unknown[]): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });
  const fnRef = useRef(fn);
  fnRef.current = fn;

  useEffect(() => {
    let cancelled = false;
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    fnRef
      .current()
      .then((data) => {
        if (!cancelled) setState({ data, isLoading: false, error: null });
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            data: null,
            isLoading: false,
            error: error instanceof Error ? error : new Error('Something went wrong'),
          });
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}

interface AsyncActionState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

/** Imperative action hook shape used by write actions like useSignIn / useUpdateBookingStatus. */
export function useAsyncAction<Args extends unknown[], T>(
  fn: (...args: Args) => Promise<T>,
): AsyncActionState<T> & { mutate: (...args: Args) => Promise<T | null> } {
  const [state, setState] = useState<AsyncActionState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const mutate = useCallback(async (...args: Args) => {
    setState({ data: null, isLoading: true, error: null });
    try {
      const data = await fnRef.current(...args);
      setState({ data, isLoading: false, error: null });
      return data;
    } catch (error: unknown) {
      setState({
        data: null,
        isLoading: false,
        error: error instanceof Error ? error : new Error('Something went wrong'),
      });
      return null;
    }
  }, []);

  return { ...state, mutate };
}
