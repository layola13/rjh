/**
 * Cache data accessor module
 * 
 * Retrieves cached data from DOM elements or objects.
 * 
 * @module module_get
 * @original-id get
 */

/**
 * Retrieves cached data associated with an element.
 * 
 * @template T - The type of the cached value
 * @param target - The DOM element or object that holds the cached data
 * @param key - Optional key to retrieve specific cached property. If omitted, returns entire cache object
 * @returns The cached value for the specified key, or the entire cache object if no key provided
 * 
 * @example
 * // Get entire cache
 * const cache = get(element);
 * 
 * @example
 * // Get specific cached property
 * const value = get(element, 'myData');
 */
declare function get<T = unknown>(
  target: Element | object,
  key?: string
): T | Record<string, unknown> | undefined;

/**
 * Cache manager interface
 */
declare interface CacheManager {
  /**
   * Internal property name used to store cache data on elements
   */
  readonly expando: string;

  /**
   * Retrieves all cached data for a target element
   * 
   * @param target - The element or object to retrieve cache from
   * @returns The cache object containing all stored data
   */
  cache(target: Element | object): Record<string, unknown> | undefined;
}

/**
 * Utility functions (assumed from `b` reference)
 */
declare namespace b {
  /**
   * Converts a string to camelCase format
   * 
   * @param str - The string to convert (e.g., "data-user-name")
   * @returns The camelCased string (e.g., "dataUserName")
   */
  function camelCase(str: string): string;
}