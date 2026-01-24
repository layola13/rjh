/**
 * Initializes a new list cache instance.
 * This constructor creates an empty list-based cache with no entries.
 * Typically used as a fallback cache implementation when Map is not available.
 */
declare class ListCache {
  /**
   * The internal data storage array.
   * Each entry is a key-value pair stored as [key, value].
   */
  __data__: Array<[unknown, unknown]>;

  /**
   * The number of entries in the cache.
   */
  size: number;

  /**
   * Creates a new ListCache instance with empty data.
   */
  constructor();
}

export = ListCache;