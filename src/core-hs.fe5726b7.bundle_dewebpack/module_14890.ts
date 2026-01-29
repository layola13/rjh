export function extendObject<T extends object, S extends object>(
  target: T,
  source: S,
  options?: unknown
): T & S {
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      defineProperty(target, key, source[key], options);
    }
  }
  return target as T & S;
}

function defineProperty(
  obj: object,
  key: string | symbol,
  value: unknown,
  options?: unknown
): void {
  // Implementation depends on module 13327
  // Placeholder for the actual defineProperty logic
  Object.defineProperty(obj, key, {
    value,
    writable: true,
    enumerable: true,
    configurable: true
  });
}