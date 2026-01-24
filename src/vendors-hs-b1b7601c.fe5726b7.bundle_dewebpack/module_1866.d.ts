/**
 * Hash set method for setting a key-value pair.
 * 
 * @remarks
 * This method is part of a hash-based data structure implementation.
 * It handles special cases for `undefined` values by using a placeholder string.
 * 
 * @template K - The type of the key
 * @template V - The type of the value
 * 
 * @param key - The key to set in the hash
 * @param value - The value to associate with the key
 * @returns The hash instance for method chaining
 */
export function hashSet<K extends string | number | symbol, V>(
  this: HashInstance<K, V>,
  key: K,
  value: V
): HashInstance<K, V>;

/**
 * Represents a hash-based data structure instance.
 * 
 * @template K - The type of keys stored in the hash
 * @template V - The type of values stored in the hash
 */
export interface HashInstance<K extends string | number | symbol, V> {
  /** Internal data storage for key-value pairs */
  __data__: Record<K, V | typeof LODASH_HASH_UNDEFINED>;
  
  /** The number of key-value pairs in the hash */
  size: number;
  
  /**
   * Checks if a key exists in the hash.
   * 
   * @param key - The key to check
   * @returns `true` if the key exists, `false` otherwise
   */
  has(key: K): boolean;
}

/**
 * Placeholder constant used to represent `undefined` values in the hash.
 * This prevents issues with native support detection.
 */
export const LODASH_HASH_UNDEFINED = "__lodash_hash_undefined__" as const;

/**
 * Determines if native support for a feature is available.
 * This is typically used to detect if certain JavaScript features are supported.
 */
export const nativeSupport: boolean;