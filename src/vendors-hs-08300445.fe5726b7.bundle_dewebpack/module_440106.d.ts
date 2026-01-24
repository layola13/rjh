/**
 * A key-value storage manager with change tracking capabilities.
 * Maintains a map of values and records modifications for diffing purposes.
 * 
 * @template T The type of values stored in the maps
 */
declare class StorageManager<T = unknown> {
  /**
   * Internal storage object for key-value pairs.
   * Uses Object.create(null) to avoid prototype pollution.
   */
  maps: Record<string, T>;

  /**
   * Auto-incrementing identifier that increases with each set operation.
   * Can be used to track the number of modifications or as a version counter.
   */
  id: number;

  /**
   * Records of previous values before they were overwritten.
   * Maps keys to their previous values for diff tracking.
   */
  diffRecords: Map<string, T | undefined>;

  /**
   * Creates a new StorageManager instance.
   * Initializes empty storage and diff tracking.
   */
  constructor();

  /**
   * Sets a value for the given key and records the previous value.
   * Increments the internal ID counter after each operation.
   * 
   * @param key - The key to store the value under
   * @param value - The value to store
   */
  set(key: string, value: T): void;

  /**
   * Retrieves the value associated with the given key.
   * 
   * @param key - The key to look up
   * @returns The stored value, or undefined if the key doesn't exist
   */
  get(key: string): T | undefined;

  /**
   * Clears all recorded diff history.
   * Does not affect the current stored values.
   */
  resetRecord(): void;

  /**
   * Retrieves the map of all recorded changes.
   * 
   * @returns A Map containing keys and their previous values before modification
   */
  getRecord(): Map<string, T | undefined>;
}

export default StorageManager;