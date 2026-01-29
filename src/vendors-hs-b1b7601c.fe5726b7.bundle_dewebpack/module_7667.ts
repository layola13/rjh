const HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Gets the hash value for the specified key.
 * @param key - The key of the value to get
 * @returns The value associated with the key, or undefined if not found
 */
function hashGet<T = unknown>(this: { __data__: Record<string, T | typeof HASH_UNDEFINED> }, key: string): T | undefined {
  const data = this.__data__;
  
  if (Map) {
    const value = data[key];
    return value === HASH_UNDEFINED ? undefined : value;
  }
  
  return Object.prototype.hasOwnProperty.call(data, key) ? data[key] as T : undefined;
}

export default hashGet;