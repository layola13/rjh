export default function createProxyWrapper<T extends Record<string, unknown>>(
  sourceObject: T,
  interceptor: <R>(result: R) => R
): Partial<T> {
  const proxiedObject: Partial<T> = {};

  for (const key in sourceObject) {
    const value = sourceObject[key];
    
    if (typeof value === "function") {
      proxiedObject[key] = function(this: unknown, ...args: unknown[]): unknown {
        return interceptor((value as (...args: unknown[]) => unknown).apply(this, args));
      } as T[typeof key];
    }
  }

  return proxiedObject;
}