export function createPropertyAccessor<T, K extends keyof T>(propertyName: K): (obj: T | null | undefined) => T[K] | undefined {
  return function(obj: T | null | undefined): T[K] | undefined {
    return obj == null ? undefined : obj[propertyName];
  };
}