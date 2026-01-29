export function createPropertyAccessor<T, K extends keyof T>(propertyKey: K): (obj: T | null | undefined) => T[K] | undefined {
  return function(obj: T | null | undefined): T[K] | undefined {
    return obj?.[propertyKey];
  };
}