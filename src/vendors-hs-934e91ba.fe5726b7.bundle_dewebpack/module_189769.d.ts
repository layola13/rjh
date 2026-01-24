/**
 * Cache constructor that initializes a multi-type data structure for storing key-value pairs.
 * Uses different storage strategies based on key type (hash for objects, map for any type, string for primitives).
 */
declare class Cache {
  /**
   * The number of entries in the cache.
   */
  size: number;

  /**
   * Internal data structure that stores cached values using different strategies.
   */
  __data__: {
    /**
     * Hash-based storage for object keys.
     */
    hash: Hash;

    /**
     * Map-based storage, uses native Map if available, otherwise falls back to MapCache.
     */
    map: Map<unknown, unknown> | MapCache;

    /**
     * Hash-based storage for string keys.
     */
    string: Hash;
  };

  /**
   * Creates a new Cache instance with empty storage structures.
   */
  constructor();
}

/**
 * Hash data structure for efficient key-value storage.
 */
declare class Hash {
  constructor();
}

/**
 * Fallback map implementation for environments without native Map support.
 */
declare class MapCache {
  constructor();
}

export default Cache;