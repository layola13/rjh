const HASH_UNDEFINED = '__lodash_hash_undefined__';

interface HashMap<T = any> {
  [key: string]: T | typeof HASH_UNDEFINED;
}

class HashCache<T = any> {
  private __data__: HashMap<T>;

  constructor(data: HashMap<T>) {
    this.__data__ = data;
  }

  /**
   * Gets the hash value for the given key.
   * @param key - The key to retrieve the value for
   * @returns The value associated with the key, or undefined if not found
   */
  get(key: string): T | undefined {
    const data = this.__data__;
    const hasNativeMap = typeof Map !== 'undefined';

    if (hasNativeMap) {
      const value = data[key];
      return value === HASH_UNDEFINED ? undefined : value;
    }

    return Object.prototype.hasOwnProperty.call(data, key) ? data[key] : undefined;
  }
}

export function hashGet<T = any>(this: HashCache<T>, key: string): T | undefined {
  const data = this.__data__;
  const hasNativeMap = typeof Map !== 'undefined';

  if (hasNativeMap) {
    const value = data[key];
    return value === HASH_UNDEFINED ? undefined : (value as T);
  }

  return Object.prototype.hasOwnProperty.call(data, key) ? (data[key] as T) : undefined;
}

export default hashGet;