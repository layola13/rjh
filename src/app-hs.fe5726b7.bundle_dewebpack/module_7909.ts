function defineProperty<T extends object, K extends PropertyKey>(
  target: T,
  key: K,
  value: unknown
): void {
  if (key === "__proto__" && typeof Object.defineProperty === "function") {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: true,
      value: value,
      writable: true
    });
  } else {
    (target as Record<PropertyKey, unknown>)[key] = value;
  }
}

export default defineProperty;