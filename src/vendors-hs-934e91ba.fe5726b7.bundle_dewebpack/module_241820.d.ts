/**
 * Sets a value in the hash data structure.
 * 
 * @template K - The type of the key
 * @template V - The type of the value
 * @param key - The key to set in the hash
 * @param value - The value to associate with the key
 * @returns The hash instance for method chaining
 * 
 * @remarks
 * This method is part of a Hash data structure implementation (likely from Lodash).
 * - Increments size only if the key doesn't already exist
 * - Uses a sentinel value for undefined when nativeMap is not supported
 * - Supports method chaining by returning 'this'
 */
export declare function hashSet<K extends string | number | symbol, V>(
  this: Hash<K, V>,
  key: K,
  value: V
): Hash<K, V>;

/**
 * Hash data structure interface
 * 
 * @template K - The type of keys stored in the hash
 * @template V - The type of values stored in the hash
 */
export interface Hash<K extends string | number | symbol, V> {
  /** Internal data storage object */
  __data__: Record<K, V | typeof HASH_UNDEFINED>;
  
  /** Current number of entries in the hash */
  size: number;
  
  /** Checks if a key exists in the hash */
  has(key: K): boolean;
  
  /** Sets a key-value pair in the hash */
  set(key: K, value: V): this;
}

/**
 * Sentinel value used to represent undefined in hash storage
 * when native Map is not supported
 */
export declare const HASH_UNDEFINED: "__lodash_hash_undefined__";

/**
 * Flag indicating whether native Map is supported and should be used
 */
export declare const nativeMap: boolean;