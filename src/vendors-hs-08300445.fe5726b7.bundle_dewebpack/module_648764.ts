export default function mergeCallbacks<T extends unknown[]>(...callbacks: Array<((...args: T) => void) | null | undefined>): (...args: T) => void {
  if (callbacks.length === 1) {
    return callbacks[0] ?? (() => {});
  }
  
  return function(this: unknown, ...args: T): void {
    for (let i = 0; i < callbacks.length; i++) {
      const callback = callbacks[i];
      if (callback?.apply) {
        callback.apply(this, args);
      }
    }
  };
}