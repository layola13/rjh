import clear from './module_4785';
import deleteMethod from './module_1285';
import get from './module_6000';
import has from './module_9916';
import set from './module_5265';

/**
 * Hash map implementation using key-value pairs.
 * Provides O(1) average time complexity for basic operations.
 */
class HashMap<K = unknown, V = unknown> {
  /**
   * Creates a new HashMap instance.
   * @param entries - Optional array of key-value pairs to initialize the map
   */
  constructor(entries?: ReadonlyArray<readonly [K, V]> | null) {
    const length = entries?.length ?? 0;
    let index = -1;

    this.clear();

    while (++index < length) {
      const entry = entries![index];
      this.set(entry[0], entry[1]);
    }
  }

  /**
   * Removes all key-value pairs from the map.
   */
  clear: () => void = clear;

  /**
   * Removes the specified key and its associated value from the map.
   * @param key - The key to remove
   * @returns True if the key was found and removed, false otherwise
   */
  delete: (key: K) => boolean = deleteMethod;

  /**
   * Retrieves the value associated with the specified key.
   * @param key - The key to look up
   * @returns The value associated with the key, or undefined if not found
   */
  get: (key: K) => V | undefined = get;

  /**
   * Checks whether the map contains the specified key.
   * @param key - The key to check
   * @returns True if the key exists in the map, false otherwise
   */
  has: (key: K) => boolean = has;

  /**
   * Associates the specified value with the specified key in the map.
   * @param key - The key to set
   * @param value - The value to associate with the key
   * @returns The HashMap instance for method chaining
   */
  set: (key: K, value: V) => this = set;
}

export default HashMap;