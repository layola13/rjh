const globalThis = (function(): typeof window | typeof global {
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  if (typeof self !== 'undefined') return self;
  return {} as any;
})();

export function defineGlobalProperty<T>(propertyName: string, propertyValue: T): T {
  try {
    Object.defineProperty(globalThis, propertyName, {
      value: propertyValue,
      configurable: true,
      writable: true
    });
  } catch (error) {
    (globalThis as any)[propertyName] = propertyValue;
  }
  return propertyValue;
}