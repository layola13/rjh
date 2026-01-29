interface MapCacheEntry<K, V> {
  0: K;
  1: V;
}

class MapCache<K = any, V = any> {
  /**
   * Creates a map cache instance.
   * @param entries - Optional array of key-value pairs to initialize the cache
   */
  constructor(entries?: Array<MapCacheEntry<K, V>> | null) {
    this.clear();
    
    if (entries == null) {
      return;
    }
    
    const length = entries.length;
    for (let index = 0; index < length; index++) {
      const entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  /**
   * Clears all entries from the map cache.
   */
  clear(): void {
    throw new Error('Method clear() must be implemented');
  }

  /**
   * Removes the entry for the given key.
   * @param key - The key of the entry to remove
   * @returns True if the entry was removed, false otherwise
   */
  delete(key: K): boolean {
    throw new Error('Method delete() must be implemented');
  }

  /**
   * Gets the value associated with the given key.
   * @param key - The key to look up
   * @returns The value associated with the key, or undefined if not found
   */
  get(key: K): V | undefined {
    throw new Error('Method get() must be implemented');
  }

  /**
   * Checks if an entry exists for the given key.
   * @param key - The key to check
   * @returns True if the key exists, false otherwise
   */
  has(key: K): boolean {
    throw new Error('Method has() must be implemented');
  }

  /**
   * Sets the value for the given key.
   * @param key - The key to set
   * @param value - The value to associate with the key
   * @returns The map cache instance for chaining
   */
  set(key: K, value: V): this {
    throw new Error('Method set() must be implemented');
  }
}

export default MapCache;