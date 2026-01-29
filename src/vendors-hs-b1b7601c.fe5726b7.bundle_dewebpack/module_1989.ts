interface MapEntry<K, V> {
  0: K;
  1: V;
}

/**
 * A hash map implementation that stores key-value pairs.
 * Supports standard map operations: clear, delete, get, has, and set.
 */
class HashMap<K = unknown, V = unknown> {
  private data: Map<K, V>;

  /**
   * Creates a new HashMap instance.
   * @param entries - Optional array of key-value pairs to initialize the map
   */
  constructor(entries?: Array<MapEntry<K, V>> | null) {
    this.data = new Map<K, V>();
    this.clear();

    if (entries != null) {
      const length = entries.length;
      let index = -1;

      while (++index < length) {
        const entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
  }

  /**
   * Removes all key-value pairs from the map.
   */
  clear(): void {
    this.data = new Map<K, V>();
  }

  /**
   * Removes the specified key and its associated value from the map.
   * @param key - The key to remove
   * @returns True if the key existed and was removed, false otherwise
   */
  delete(key: K): boolean {
    return this.data.delete(key);
  }

  /**
   * Retrieves the value associated with the specified key.
   * @param key - The key to look up
   * @returns The value associated with the key, or undefined if not found
   */
  get(key: K): V | undefined {
    return this.data.get(key);
  }

  /**
   * Checks if the map contains the specified key.
   * @param key - The key to check
   * @returns True if the key exists, false otherwise
   */
  has(key: K): boolean {
    return this.data.has(key);
  }

  /**
   * Associates the specified value with the specified key in the map.
   * @param key - The key to set
   * @param value - The value to associate with the key
   * @returns The HashMap instance for method chaining
   */
  set(key: K, value: V): this {
    this.data.set(key, value);
    return this;
  }
}

export default HashMap;