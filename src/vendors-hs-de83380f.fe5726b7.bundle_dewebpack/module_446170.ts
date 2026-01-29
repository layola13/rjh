function toPropertyKey(key: unknown): string | symbol {
  const primitiveKey = toPrimitive(key, 'string');
  return typeof primitiveKey === 'symbol' ? primitiveKey : String(primitiveKey);
}

function toPrimitive(input: unknown, hint: 'string' | 'number' | 'default'): unknown {
  if (typeof input !== 'object' || input === null) {
    return input;
  }
  
  const exoticToPrim = (input as any)[Symbol.toPrimitive];
  if (exoticToPrim !== undefined) {
    const result = exoticToPrim.call(input, hint);
    if (typeof result !== 'object') {
      return result;
    }
    throw new TypeError('Cannot convert object to primitive value');
  }
  
  const convertHint = hint === 'string' ? 'string' : 'number';
  return ordinaryToPrimitive(input, convertHint);
}

function ordinaryToPrimitive(obj: any, hint: 'string' | 'number'): unknown {
  const methodNames = hint === 'string' ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
  
  for (const name of methodNames) {
    const method = obj[name];
    if (typeof method === 'function') {
      const result = method.call(obj);
      if (typeof result !== 'object') {
        return result;
      }
    }
  }
  
  throw new TypeError('Cannot convert object to primitive value');
}

export default function defineProperty<T extends object, K extends PropertyKey>(
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