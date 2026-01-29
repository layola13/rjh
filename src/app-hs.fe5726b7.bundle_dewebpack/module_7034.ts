/**
 * Creates an array of the own enumerable property names of an array-like object,
 * filtering out properties that should be excluded based on the object type.
 * 
 * @param value - The array-like object to query
 * @param inherited - Whether to include inherited properties
 * @returns An array of property names
 */
export function arrayLikeKeys(value: unknown, inherited: boolean): string[] {
  const isArray = Array.isArray(value);
  const isArguments = !isArray && isArgumentsObject(value);
  const isBuffer = !isArray && !isArguments && isBufferObject(value);
  const isTypedArray = !isArray && !isArguments && !isBuffer && isTypedArrayObject(value);
  const isArrayLike = isArray || isArguments || isBuffer || isTypedArray;
  
  const result = isArrayLike ? baseTimes(getLength(value), String) : [];
  const length = result.length;
  
  for (const key in value) {
    const shouldSkip = !inherited && !Object.prototype.hasOwnProperty.call(value, key);
    const isLengthProperty = key === "length";
    const isBufferProperty = isBuffer && (key === "offset" || key === "parent");
    const isTypedArrayProperty = isTypedArray && (key === "buffer" || key === "byteLength" || key === "byteOffset");
    const isIndexProperty = isIndex(key, length);
    
    const shouldExclude = isArrayLike && (
      isLengthProperty ||
      isBufferProperty ||
      isTypedArrayProperty ||
      isIndexProperty
    );
    
    if (!shouldSkip && !shouldExclude) {
      result.push(key);
    }
  }
  
  return result;
}

function baseTimes(count: number, iteratee: (index: number) => string): string[] {
  const result: string[] = [];
  let index = -1;
  
  while (++index < count) {
    result[index] = iteratee(index);
  }
  
  return result;
}

function isArgumentsObject(value: unknown): boolean {
  return Object.prototype.toString.call(value) === '[object Arguments]';
}

function isBufferObject(value: unknown): boolean {
  return typeof Buffer !== 'undefined' && Buffer.isBuffer(value);
}

function isTypedArrayObject(value: unknown): boolean {
  const typedArrayTags = new Set([
    '[object Float32Array]', '[object Float64Array]',
    '[object Int8Array]', '[object Int16Array]', '[object Int32Array]',
    '[object Uint8Array]', '[object Uint8ClampedArray]',
    '[object Uint16Array]', '[object Uint32Array]'
  ]);
  
  return typedArrayTags.has(Object.prototype.toString.call(value));
}

function getLength(value: unknown): number {
  return (value as { length?: number })?.length ?? 0;
}

function isIndex(value: string, length: number): boolean {
  const MAX_SAFE_INTEGER = 9007199254740991;
  const reIsUint = /^(?:0|[1-9]\d*)$/;
  
  const numValue = +value;
  return reIsUint.test(value) && numValue > -1 && numValue % 1 === 0 && numValue < length && numValue < MAX_SAFE_INTEGER;
}