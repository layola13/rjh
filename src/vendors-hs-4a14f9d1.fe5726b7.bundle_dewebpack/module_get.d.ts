/**
 * Module: module_get
 * Retrieves a value from the internal storage object by key
 */

/**
 * Gets a value from the internal storage by the specified key
 * @template T - The type of values stored in the internal object
 * @param key - The key to look up in the internal storage
 * @returns The value associated with the key, or undefined if not found
 */
declare function get<T = unknown>(key: string | number | symbol): T | undefined;

export default get;

/**
 * Alternative interface if this is a method on a class
 */
export interface ModuleGetContainer<T = unknown> {
  /**
   * Internal storage object
   */
  readonly b: Record<string | number | symbol, T>;
  
  /**
   * Retrieves a value from internal storage by key
   * @param key - The key to retrieve
   * @returns The value associated with the key
   */
  get(key: string | number | symbol): T | undefined;
}