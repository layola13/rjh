/**
 * Module: module_get
 * 
 * Retrieves a value from an internal collection by key.
 * 
 * @template K - The type of keys used to index the collection
 * @template V - The type of values stored in the collection
 */
declare module 'module_get' {
  /**
   * Interface representing an object with a getter method
   */
  export interface ModuleGet<K extends PropertyKey, V> {
    /**
     * Internal storage collection
     * @internal
     */
    readonly b: Record<K, V>;

    /**
     * Retrieves a value from the internal collection by key
     * 
     * @param key - The key to look up in the collection
     * @returns The value associated with the key, or undefined if not found
     */
    get(key: K): V | undefined;
  }

  export default ModuleGet;
}