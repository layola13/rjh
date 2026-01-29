export function isArray(value: unknown): value is unknown[] {
  const objectToString = {}.toString;
  return "[object Array]" === objectToString.call(value);
}

export default Array.isArray || isArray;