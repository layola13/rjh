function getObjectKeys<T extends object>(obj: T, includeInherited: boolean): string[] {
  const isArray = Array.isArray(obj);
  const isArguments = isArgumentsObject(obj);
  const isBuffer = !isArray && !isArguments && isBufferLike(obj);
  const isTypedArray = !isArray && !isArguments && !isBuffer && isTypedArrayLike(obj);
  const isArrayLike = isArray || isArguments || isBuffer || isTypedArray;
  const result = isArrayLike ? baseTimes(obj.length, String) : [];
  const resultLength = result.length;

  for (const key in obj) {
    const shouldSkipNonOwn = !includeInherited && !Object.prototype.hasOwnProperty.call(obj, key);
    const isLengthProperty = key === "length";
    const isBufferProperty = isBuffer && (key === "offset" || key === "parent");
    const isTypedArrayProperty = isTypedArray && (key === "buffer" || key === "byteLength" || key === "byteOffset");
    const isArrayIndex = isValidArrayIndex(key, resultLength);
    const shouldSkipArrayLike = isArrayLike && (isLengthProperty || isBufferProperty || isTypedArrayProperty || isArrayIndex);

    if (!shouldSkipNonOwn && !shouldSkipArrayLike) {
      result.push(key);
    }
  }

  return result;
}

function baseTimes(length: number, iteratee: (index: number) => string): string[] {
  const result: string[] = [];
  let index = -1;

  while (++index < length) {
    result[index] = iteratee(index);
  }

  return result;
}

function isArgumentsObject(value: unknown): boolean {
  return Object.prototype.toString.call(value) === "[object Arguments]";
}

function isBufferLike(value: unknown): boolean {
  return typeof Buffer !== "undefined" && Buffer.isBuffer(value);
}

function isTypedArrayLike(value: unknown): boolean {
  const typedArrayTags = new Set([
    "[object Float32Array]",
    "[object Float64Array]",
    "[object Int8Array]",
    "[object Int16Array]",
    "[object Int32Array]",
    "[object Uint8Array]",
    "[object Uint8ClampedArray]",
    "[object Uint16Array]",
    "[object Uint32Array]"
  ]);

  return typedArrayTags.has(Object.prototype.toString.call(value));
}

function isValidArrayIndex(key: string, length: number): boolean {
  const numKey = Number(key);
  return numKey > -1 && numKey % 1 === 0 && numKey < length;
}

export { getObjectKeys };