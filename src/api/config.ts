/**
 * Single switch: flip to false once the real backend endpoints exist.
 * See src/api/README.md for the payload shapes each resource module expects.
 */
export const USE_MOCKS = true;

export function simulateDelay<T>(value: T, ms = 400): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}
