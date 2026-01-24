/**
 * Hash data structure delete method
 * Removes a key from the internal hash map and updates the size counter
 */
interface HashDelete {
  /**
   * Deletes a key-value pair from the hash map
   * @param key - The key to delete from the hash map
   * @returns True if the key existed and was deleted, false otherwise
   */
  (key: string | number | symbol): boolean;
}

/**
 * Context for hash map operations
 * Represents the internal state of a hash-based data structure
 */
interface HashContext {
  /** Internal storage object for key-value pairs */
  __data__: Record<string | number | symbol, unknown>;
  
  /** Current number of entries in the hash map */
  size: number;
  
  /**
   * Checks if a key exists in the hash map
   * @param key - The key to check
   * @returns True if the key exists, false otherwise
   */
  has(key: string | number | symbol): boolean;
}

/**
 * Creates a delete method for a hash map data structure
 * @param this - The hash context containing the data store and size
 * @param key - The key to remove from the hash map
 * @returns True if the element was successfully removed, false if it didn't exist
 * @example
 * const hashDelete = hashDeleteFactory();
 * const existed = hashDelete.call(hashContext, 'myKey'); // true or false
 */
declare function hashDelete(this: HashContext, key: string | number | symbol): boolean;

export default hashDelete;