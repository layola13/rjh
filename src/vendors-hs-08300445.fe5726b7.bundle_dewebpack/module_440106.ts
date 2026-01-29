/**
 * A key-value store that tracks changes to its entries.
 * Maintains both current values and a record of previous values for modified keys.
 */
export default class DiffTrackingMap<K extends string | number = string, V = unknown> {
  /**
   * Internal storage for current key-value pairs.
   * Uses a null-prototype object for clean property access.
   */
  maps: Record<K, V>;

  /**
   * Monotonically increasing counter tracking the total number of modifications.
   */
  id: number;

  /**
   * Records previous values of modified keys.
   * Maps keys to their values before the most recent set operation.
   */
  diffRecords: Map<K, V | undefined>;

  constructor();

  /**
   * Sets a value for the given key and records the previous value.
   * Increments the modification counter.
   * 
   * @param key - The key to set
   * @param value - The value to associate with the key
   */
  set(key: K, value: V): void;

  /**
   * Retrieves the current value for the given key.
   * 
   * @param key - The key to look up
   * @returns The value associated with the key, or undefined if not present
   */
  get(key: K): V | undefined;

  /**
   * Clears all tracked change records.
   * Does not affect current values stored in maps.
   */
  resetRecord(): void;

  /**
   * Returns the map of all recorded changes.
   * 
   * @returns A Map containing keys and their previous values
   */
  getRecord(): Map<K, V | undefined>;
}