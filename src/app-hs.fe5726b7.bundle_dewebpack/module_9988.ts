function isObject(value: unknown): value is object {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}

function baseCreate<T extends object>(proto: T | null): T | Record<string, never> {
  if (!isObject(proto)) {
    return {};
  }
  
  if (Object.create) {
    return Object.create(proto) as T;
  }
  
  function TemporaryConstructor() {}
  TemporaryConstructor.prototype = proto as object;
  const result = new (TemporaryConstructor as any)() as T;
  TemporaryConstructor.prototype = undefined as any;
  
  return result;
}

export default baseCreate;