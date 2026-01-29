interface ArrayLike<T> {
  length: number;
  [index: number]: T;
}

type ObjectWithNumericKeys = Record<string | number, unknown>;

function baseTimes(length: number, iteratee: (index: number) => string): string[] {
  let index = -1;
  const result = new Array(length);
  while (++index < length) {
    result[index] = iteratee(index);
  }
  return result;
}

function isArrayLike(value: unknown): value is ArrayLike<unknown> {
  return value != null && typeof value === 'object' && 'length' in value;
}

function isArguments(value: unknown): boolean {
  return Object.prototype.toString.call(value) === '[object Arguments]';
}

function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

function isBuffer(value: unknown): boolean {
  return (
    value != null &&
    typeof value === 'object' &&
    'constructor' in value &&
    typeof (value as any).constructor?.isBuffer === 'function' &&
    (value as any).constructor.isBuffer(value)
  );
}

function isTypedArray(value: unknown): value is TypedArray {
  const typedArrayTags: Record<string, boolean> = {
    '[object Float32Array]': true,
    '[object Float64Array]': true,
    '[object Int8Array]': true,
    '[object Int16Array]': true,
    '[object Int32Array]': true,
    '[object Uint8Array]': true,
    '[object Uint8ClampedArray]': true,
    '[object Uint16Array]': true,
    '[object Uint32Array]': true
  };
  return typedArrayTags[Object.prototype.toString.call(value)] === true;
}

type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array;

const MAX_SAFE_INTEGER = 9007199254740991;
const reIsUint = /^(?:0|[1-9]\d*)$/;

function isIndex(value: string | number | symbol, maxLength?: number): boolean {
  const length = maxLength ?? MAX_SAFE_INTEGER;
  return (
    !!length &&
    (typeof value === 'number' || (typeof value === 'string' && reIsUint.test(value))) &&
    value > -1 &&
    value % 1 === 0 &&
    value < length
  );
}

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Creates an array of the own enumerable property names of an array-like object,
 * excluding special properties based on the object type.
 *
 * @param target - The array-like object to query
 * @param includeInherited - Whether to include inherited properties
 * @returns An array of property names
 */
export function getOwnEnumerableProperties(
  target: ObjectWithNumericKeys,
  includeInherited?: boolean
): string[] {
  const isArr = isArray(target);
  const isArgs = !isArr && isArguments(target);
  const isBuf = !isArr && !isArgs && isBuffer(target);
  const isTyped = !isArr && !isArgs && !isBuf && isTypedArray(target);
  const skipIndexes = isArr || isArgs || isBuf || isTyped;
  const result = skipIndexes ? baseTimes(target.length, String) : [];
  const resultLength = result.length;

  for (const key in target) {
    const shouldSkip =
      (!includeInherited && !hasOwnProperty.call(target, key)) ||
      (skipIndexes &&
        (key === 'length' ||
          (isBuf && (key === 'offset' || key === 'parent')) ||
          (isTyped && (key === 'buffer' || key === 'byteLength' || key === 'byteOffset')) ||
          isIndex(key, resultLength)));

    if (!shouldSkip) {
      result.push(key);
    }
  }

  return result;
}