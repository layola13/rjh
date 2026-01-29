function isArrayLike(value: unknown): value is ArrayLike<unknown> {
  return value != null && typeof value === 'object' && typeof (value as any).length === 'number';
}

function isPrototype(value: unknown): boolean {
  const Ctor = value && (value as any).constructor;
  const proto = (typeof Ctor === 'function' && Ctor.prototype) || Object.prototype;
  return value === proto;
}

function nativeKeys(object: object): string[] {
  return Object.keys(object);
}

export function keys(value: object): string[] {
  if (!isArrayLike(value)) {
    return nativeKeys(value);
  }
  
  const isProto = isPrototype(value);
  const result: string[] = [];
  
  for (const key in value) {
    if (key !== 'constructor' || (!isProto && Object.prototype.hasOwnProperty.call(value, key))) {
      result.push(key);
    }
  }
  
  return result;
}