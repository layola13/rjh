function baseGetTag(value: unknown): string {
  return Object.prototype.toString.call(value);
}

function isObject(value: unknown): value is object {
  const type = typeof value;
  return value !== null && (type === 'object' || type === 'function');
}

function isFunction(value: unknown): value is Function {
  if (!isObject(value)) {
    return false;
  }
  
  const tag = baseGetTag(value);
  return (
    tag === '[object Function]' ||
    tag === '[object GeneratorFunction]' ||
    tag === '[object AsyncFunction]' ||
    tag === '[object Proxy]'
  );
}

export default isFunction;