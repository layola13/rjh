export function composeCallbacks<T extends unknown[]>(
  ...callbacks: Array<((...args: T) => void) | null | undefined>
): ((...args: T) => void) | undefined {
  const validCallbacks = callbacks.filter(
    (callback): callback is (...args: T) => void => callback != null
  );

  if (validCallbacks.length === 0) {
    return undefined;
  }

  if (validCallbacks.length === 1) {
    return validCallbacks[0];
  }

  return validCallbacks.reduce(
    (composedCallback, currentCallback) =>
      function (this: unknown, ...args: T): void {
        composedCallback.apply(this, args);
        currentCallback.apply(this, args);
      }
  );
}