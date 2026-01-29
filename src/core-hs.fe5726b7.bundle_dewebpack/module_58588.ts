const globalObject = globalThis;

export function defineGlobalProperty<T>(propertyName: string, value: T): T {
  try {
    Object.defineProperty(globalObject, propertyName, {
      value,
      configurable: true,
      writable: true
    });
  } catch (error) {
    globalObject[propertyName] = value;
  }
  return value;
}