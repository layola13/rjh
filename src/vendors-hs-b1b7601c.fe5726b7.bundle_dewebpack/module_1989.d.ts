/**
 * Hash map implementation using paired array entries.
 * Provides a basic key-value store with clear, delete, get, has, and set operations.
 */
declare class HashMap<K = any, V = any> {
  /**
   * Creates a new HashMap instance.
   * @param entries - Optional array of key-value pairs to initialize the map
   */
  constructor(entries?: Array<[K, V]>);

  /**
   * Removes all key-value pairs from the hash map.
   */
  clear(): void;

  /**
   * Removes a key-value pair from the hash map.
   * @param key - The key to remove
   * @returns True if the key was found and removed, false otherwise
   */
  delete(key: K): boolean;

  /**
   * Retrieves the value associated with the specified key.
   * @param key - The key to look up
   * @returns The value associated with the key, or undefined if not found
   */
  get(key: K): V | undefined;

  /**
   * Checks if a key exists in the hash map.
   * @param key - The key to check
   * @returns True if the key exists, false otherwise
   */
  has(key: K): boolean;

  /**
   * Sets a key-value pair in the hash map.
   * @param key - The key to set
   * @param value - The value to associate with the key
   * @returns The HashMap instance for chaining
   */
  set(key: K, value: V): this;
}

export = HashMap;