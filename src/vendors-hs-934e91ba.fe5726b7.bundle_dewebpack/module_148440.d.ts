/**
 * Retrieves the value associated with a key from the hash data structure.
 * 
 * This method is part of a Hash implementation that stores key-value pairs.
 * It handles the special case where Lodash uses a placeholder value
 * "__lodash_hash_undefined__" to represent actual undefined values.
 * 
 * @template T - The type of values stored in the hash
 * @param key - The key to look up in the hash
 * @returns The value associated with the key, or undefined if not found
 */
declare function hashGet<T = unknown>(key: string | number | symbol): T | undefined;

/**
 * Interface representing the internal data structure of a Hash.
 * Maps keys to values, with support for the special Lodash undefined placeholder.
 */
interface HashData {
  [key: string | number | symbol]: unknown | '__lodash_hash_undefined__';
}

/**
 * Hash class that provides efficient key-value storage.
 * Uses native Map when available, falls back to object storage.
 */
declare class Hash<T = unknown> {
  /**
   * Internal data storage for the hash
   * @internal
   */
  private __data__: HashData;

  /**
   * Retrieves the value associated with a key from the hash.
   * Returns undefined if the key doesn't exist or if the stored value
   * is the Lodash undefined placeholder.
   * 
   * @param key - The key to retrieve
   * @returns The value associated with the key, or undefined
   */
  get(key: string | number | symbol): T | undefined;
}

export = Hash;