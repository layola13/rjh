type PrimitiveValue = string | number | boolean | symbol | null | undefined;

function isCallable(value: unknown): value is Function {
  return typeof value === 'function';
}

function requireObjectCoercible(value: unknown): object | Function {
  if (typeof value === 'object' || isCallable(value)) {
    return value as object | Function;
  }
  throw new TypeError(`Can't set ${String(value)} as a prototype`);
}

export default requireObjectCoercible;