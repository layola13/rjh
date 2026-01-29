export function isArray(value: unknown): value is unknown[] {
  return Object.prototype.toString.call(value) === "[object Array]";
}

export default Array.isArray || isArray;