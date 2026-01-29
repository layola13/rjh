function isArrayLike(value: unknown): boolean {
  return value != null && isLength((value as any).length) && !isFunction(value);
}

function isLength(value: unknown): boolean {
  return typeof value === 'number' && value > -1 && value % 1 === 0 && value <= Number.MAX_SAFE_INTEGER;
}

function isFunction(value: unknown): boolean {
  const tag = value == null ? (value === undefined ? '[object Undefined]' : '[object Null]') : Object.prototype.toString.call(value);
  return tag === '[object Function]' || tag === '[object GeneratorFunction]' || tag === '[object AsyncFunction]' || tag === '[object Proxy]';
}

export { isArrayLike };