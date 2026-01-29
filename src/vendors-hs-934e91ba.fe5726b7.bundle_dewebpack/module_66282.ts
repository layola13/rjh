function getObjectKeys(obj: object): string[] {
  // Implementation for getting object keys (e.g., Object.keys equivalent)
  return Object.keys(obj);
}

function getObjectTag(value: unknown): string {
  // Implementation for getting object type tag (e.g., [object Map])
  return Object.prototype.toString.call(value);
}

function isArguments(value: unknown): boolean {
  // Implementation for checking if value is arguments object
  return getObjectTag(value) === '[object Arguments]';
}

function isArray(value: unknown): value is unknown[] {
  // Implementation for checking if value is array
  return Array.isArray(value);
}

function isArrayLike(value: unknown): boolean {
  // Implementation for checking if value is array-like
  return value != null && typeof value === 'object' && 'length' in value;
}

function isBuffer(value: unknown): boolean {
  // Implementation for checking if value is buffer
  return value != null && typeof value === 'object' && 'constructor' in value && 
         typeof (value as any).constructor === 'function' && 
         (value as any).constructor.name === 'Buffer';
}

function isPrototype(value: unknown): boolean {
  // Implementation for checking if value is prototype
  const Ctor = value != null && typeof value === 'object' && (value as any).constructor;
  const proto = (typeof Ctor === 'function' && Ctor.prototype) || Object.prototype;
  return value === proto;
}

function isTypedArray(value: unknown): boolean {
  // Implementation for checking if value is typed array
  return value != null && typeof value === 'object' && 
         /^\[object (Int8|Uint8|Uint8Clamped|Int16|Uint16|Int32|Uint32|Float32|Float64|BigInt64|BigUint64)Array\]$/.test(
           Object.prototype.toString.call(value)
         );
}

/**
 * Checks if a value is empty.
 * - Returns true for null/undefined
 * - Returns true for empty arrays, strings, buffers, typed arrays, and arguments
 * - Returns true for Maps and Sets with size 0
 * - Returns true for objects with no own enumerable properties
 */
function isEmpty(value: unknown): boolean {
  if (value == null) {
    return true;
  }

  if (
    isArrayLike(value) &&
    (isArray(value) ||
      typeof value === 'string' ||
      typeof (value as any).splice === 'function' ||
      isBuffer(value) ||
      isTypedArray(value) ||
      isArguments(value))
  ) {
    return !(value as ArrayLike<unknown>).length;
  }

  const tag = getObjectTag(value);
  if (tag === '[object Map]' || tag === '[object Set]') {
    return !(value as Map<unknown, unknown> | Set<unknown>).size;
  }

  if (isPrototype(value)) {
    return !getObjectKeys(value as object).length;
  }

  for (const key in value as object) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      return false;
    }
  }

  return true;
}

export default isEmpty;