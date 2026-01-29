interface MapCacheEntry<K, V> {
  0: K;
  1: V;
}

/**
 * A Map-like cache implementation that stores key-value pairs.
 * Provides standard map operations: clear, delete, get, has, and set.
 */
class MapCache<K = unknown, V = unknown> {
  private data: Map<K, V>;

  /**
   * Creates a new MapCache instance.
   * @param entries - Optional array of key-value pairs to initialize the cache
   */
  constructor(entries?: Array<MapCacheEntry<K, V>> | null) {
    this.data = new Map();
    this.clear();

    if (entries != null) {
      const length = entries.length;
      for (let index = 0; index < length; index++) {
        const entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
  }

  /**
   * Clears all entries from the cache.
   */
  clear(): void {
    this.data.clear();
  }

  /**
   * Removes the entry associated with the specified key.
   * @param key - The key to remove
   * @returns True if the key was found and removed, false otherwise
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
   * Checks if the cache contains an entry for the specified key.
   * @param key - The key to check
   * @returns True if the key exists in the cache, false otherwise
   */
  has(key: K): boolean {
    return this.data.has(key);
  }

  /**
   * Sets the value for the specified key in the cache.
   * @param key - The key to set
   * @param value - The value to associate with the key
   * @returns The MapCache instance for method chaining
   */
  set(key: K, value: V): this {
    this.data.set(key, value);
    return this;
  }
}

export default MapCache;