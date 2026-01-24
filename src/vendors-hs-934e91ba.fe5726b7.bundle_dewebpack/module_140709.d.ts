/**
 * Adds a value to the hash data structure.
 * Uses a special sentinel value to mark keys that exist in the hash.
 * This is part of a hash-based Set implementation.
 * 
 * @param key - The key to add to the hash
 * @returns The hash instance for method chaining
 */
export type HashAddFunction = <T>(this: Hash, key: T) => Hash;

/**
 * Represents a hash data structure with internal data storage.
 * Used for efficient Set operations in lodash.
 */
interface Hash {
  /**
   * Internal data storage for the hash.
   * Maps keys to values, using a sentinel for Set-like behavior.
   */
  __data__: Map<unknown, string>;
  
  /**
   * Adds a key to the hash with a sentinel value.
   */
  set<T>(key: T, value: string): this;
}

/**
 * Sentinel value used to indicate a key exists in the hash-based Set.
 * The actual value is irrelevant; its presence indicates membership.
 */
declare const HASH_UNDEFINED: "__lodash_hash_undefined__";

/**
 * Creates a function that adds values to a hash data structure.
 * When a key is added, it's stored with the sentinel value "__lodash_hash_undefined__".
 * 
 * @returns A function that adds keys to the hash and returns the hash instance
 */
declare function hashAdd<T>(this: Hash, key: T): Hash;

export default hashAdd;