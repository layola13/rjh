function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

function isSymbol(value: unknown): value is symbol {
  return typeof value === 'symbol';
}

const PROPERTY_ACCESSOR_PATTERN = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
const SIMPLE_PROPERTY_PATTERN = /^\w*$/;

/**
 * Checks if a value is a valid property key that can be used for direct property access.
 * 
 * @param key - The value to check as a potential property key
 * @param object - Optional object to verify if the key exists as a property
 * @returns True if the value is a valid property key, false otherwise
 */
function isKey(key: unknown, object?: unknown): boolean {
  if (isArray(key)) {
    return false;
  }

  const keyType = typeof key;

  if (
    keyType === 'number' ||
    keyType === 'symbol' ||
    keyType === 'boolean' ||
    key === null ||
    isSymbol(key)
  ) {
    return true;
  }

  const keyString = key as string;

  return (
    SIMPLE_PROPERTY_PATTERN.test(keyString) ||
    !PROPERTY_ACCESSOR_PATTERN.test(keyString) ||
    (object != null && keyString in Object(object))
  );
}

export default isKey;