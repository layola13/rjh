/**
 * SetCache - A cache structure that stores unique values using an internal Map-like data structure.
 * This class provides efficient add and has operations for maintaining a set of unique values.
 * 
 * @template T - The type of elements stored in the cache
 */
declare class SetCache<T = any> {
  /**
   * Internal data storage using a Map-like structure for O(1) lookups
   * @private
   */
  private __data__: Map<T, T>;

  /**
   * Creates a new SetCache instance
   * 
   * @param values - Optional array of initial values to populate the cache
   * @example
   * const cache = new SetCache([1, 2, 3]);
   */
  constructor(values?: T[] | null);

  /**
   * Adds a value to the cache
   * 
   * @param value - The value to add to the cache
   * @returns The SetCache instance for method chaining
   */
  add(value: T): this;

  /**
   * Adds a value to the cache (alias for add)
   * 
   * @param value - The value to push to the cache
   * @returns The SetCache instance for method chaining
   */
  push(value: T): this;

  /**
   * Checks if a value exists in the cache
   * 
   * @param value - The value to check for existence
   * @returns True if the value exists in the cache, false otherwise
   */
  has(value: T): boolean;
}

export = SetCache;