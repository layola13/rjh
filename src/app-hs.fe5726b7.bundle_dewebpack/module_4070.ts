/**
 * Gets the size of a collection or object.
 * @param value - The value to check
 * @returns The size of the collection
 */
export function size(value: unknown): number {
  if (value == null) {
    return 0;
  }

  if (isArrayLike(value)) {
    return isString(value) ? stringSize(value) : value.length;
  }

  const tag = getTag(value);
  
  if (tag === "[object Map]" || tag === "[object Set]") {
    return (value as Map<unknown, unknown> | Set<unknown>).size;
  }

  return keys(value as object).length;
}

/**
 * Checks if value is array-like.
 */
function isArrayLike(value: unknown): value is ArrayLike<unknown> | string {
  return value != null && typeof value !== 'function' && isLength((value as any).length);
}

/**
 * Checks if value is a valid array-like length.
 */
function isLength(value: unknown): boolean {
  return typeof value === 'number' && value > -1 && value % 1 === 0 && value <= Number.MAX_SAFE_INTEGER;
}

/**
 * Checks if value is a string.
 */
function isString(value: unknown): value is string {
  return typeof value === 'string' || (typeof value === 'object' && value !== null && Object.prototype.toString.call(value) === '[object String]');
}

/**
 * Gets the string tag of a value.
 */
function getTag(value: unknown): string {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]';
  }
  return Object.prototype.toString.call(value);
}

/**
 * Gets the own enumerable property names of an object.
 */
function keys(object: object): string[] {
  return Object.keys(object);
}

/**
 * Gets the size of a Unicode string.
 */
function stringSize(str: string): number {
  return Array.from(str).length;
}

export default size;