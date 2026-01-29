function isCallable(value: unknown): value is Function {
  return typeof value === 'function';
}

function inspectValue(value: unknown): string {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (typeof value === 'string') return `"${value}"`;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (typeof value === 'symbol') return value.toString();
  if (typeof value === 'object') return Object.prototype.toString.call(value);
  return String(value);
}

export function assertFunction(value: unknown): Function {
  if (isCallable(value)) {
    return value;
  }
  throw new TypeError(`${inspectValue(value)} is not a function`);
}