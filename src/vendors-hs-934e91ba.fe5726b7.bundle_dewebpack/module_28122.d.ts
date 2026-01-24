/**
 * Hash map implementation using array-based storage.
 * Provides O(n) operations for small collections.
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
   * Removes the specified key and its associated value from the hash map.
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
   * Checks whether the hash map contains the specified key.
   * @param key - The key to check for
   * @returns True if the key exists in the map, false otherwise
   */
  has(key: K): boolean;

  /**
   * Associates the specified value with the specified key in the hash map.
   * @param key - The key to set
   * @param value - The value to associate with the key
   * @returns The HashMap instance for method chaining
   */
  set(key: K, value: V): this;
}

export = HashMap;