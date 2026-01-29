/**
 * Checks if a value is empty.
 * 
 * @param value - The value to check
 * @returns Returns true if the value is empty, else false
 * 
 * Empty values include:
 * - null or undefined
 * - Empty arrays, strings, or array-like objects
 * - Maps or Sets with size 0
 * - Objects with no enumerable properties
 */
export function isEmpty(value: unknown): boolean {
  if (value == null) {
    return true;
  }

  if (isArrayLike(value) && (
    Array.isArray(value) ||
    typeof value === 'string' ||
    typeof (value as any).splice === 'function' ||
    isBuffer(value) ||
    isTypedArray(value) ||
    isArguments(value)
  )) {
    return (value as ArrayLike<unknown>).length === 0;
  }

  const tag = getTag(value);
  if (tag === '[object Map]' || tag === '[object Set]') {
    return (value as Map<unknown, unknown> | Set<unknown>).size === 0;
  }

  if (isPrototype(value)) {
    return Object.keys(value as object).length === 0;
  }

  for (const key in value as object) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      return false;
    }
  }

  return true;
}

interface ArrayLike<T> {
  readonly length: number;
  [index: number]: T;
}

function isArrayLike(value: unknown): value is ArrayLike<unknown> {
  return value != null && typeof (value as any).length === 'number' && (value as any).length >= 0;
}

function getTag(value: unknown): string {
  return Object.prototype.toString.call(value);
}

function isBuffer(value: unknown): boolean {
  return value != null && 
    typeof value === 'object' && 
    (value as any).constructor?.isBuffer?.(value) === true;
}

function isTypedArray(value: unknown): boolean {
  const tag = getTag(value);
  return /^\[object (?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|Uint8Clamped)Array\]$/.test(tag);
}

function isArguments(value: unknown): boolean {
  return getTag(value) === '[object Arguments]';
}

function isPrototype(value: unknown): boolean {
  const constructor = (value as any)?.constructor;
  const prototype = (typeof constructor === 'function' && constructor.prototype) || Object.prototype;
  return value === prototype;
}