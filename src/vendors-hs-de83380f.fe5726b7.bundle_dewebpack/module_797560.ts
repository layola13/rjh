import toPropertyKey from './toPropertyKey';

function defineProperty<T extends object, K extends PropertyKey>(
  obj: T,
  key: K,
  value: unknown
): T & Record<K, unknown> {
  const propertyKey = toPropertyKey(key);
  
  if (propertyKey in obj) {
    Object.defineProperty(obj, propertyKey, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    (obj as any)[propertyKey] = value;
  }
  
  return obj as T & Record<K, unknown>;
}

export default defineProperty;