export function createPropertyProxy<T extends object, K extends keyof T>(
  target: object,
  source: T,
  propertyKey: K
): void {
  if (propertyKey in target) {
    return;
  }

  Object.defineProperty(target, propertyKey, {
    configurable: true,
    get(): T[K] {
      return source[propertyKey];
    },
    set(value: T[K]): void {
      source[propertyKey] = value;
    }
  });
}