/**
 * Module: module_keys
 * Original ID: keys
 * 
 * Returns an iterator over all keys stored in the internal __keys__ collection.
 * Filters out inherited properties to ensure only own properties are included.
 */

/**
 * Iterator utility namespace providing iteration functionality
 */
declare namespace C {
  /**
   * Creates an iterator from an array of values
   * @param items - Array of items to iterate over
   * @returns An iterator object for the provided items
   */
  function iter<T>(items: T[]): Iterator<T>;
}

/**
 * Container interface with internal key storage
 */
interface KeyContainer<T = unknown> {
  /**
   * Internal storage object containing keyed entries
   */
  h: {
    /**
     * Special property storing key mappings
     */
    __keys__: Record<string, T>;
    [key: string]: unknown;
  };

  /**
   * Retrieves an iterator over all own keys in the container.
   * Only returns keys that are direct properties of the __keys__ object,
   * excluding inherited properties from the prototype chain.
   * 
   * @returns Iterator over the collection of keys
   * 
   * @example
   *