/**
 * Generic getter module that retrieves a value by key
 * @module module_get
 */

/**
 * Retrieves a value from the current context using the provided key
 * @template T - The type of the value being retrieved
 * @param key - The key to look up in the current context
 * @returns The value associated with the key, or undefined if not found
 */
declare function get<T = unknown>(key: string | number | symbol): T | undefined;

/**
 * Interface representing an object with a get method
 * Typically used for Map-like or collection data structures
 */
declare interface Gettable<K = string, V = unknown> {
  /**
   * Retrieves a value by key from the collection
   * @param key - The key to retrieve
   * @returns The value associated with the key, or undefined if not found
   */
  get(key: K): V | undefined;
}

/**
 * The exported getter function bound to a specific context
 * @template T - The type of value to retrieve
 * @param t - The key/identifier to look up
 * @returns The retrieved value
 */
export default function<T = unknown>(t: string | number | symbol): T | undefined;