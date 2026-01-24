/**
 * Module Bundle - Set and Get Utilities
 * 
 * This module provides utility functions for setting and getting values.
 * Originally bundled from module_set.js and module_get.js
 */

/**
 * Sets a value at the specified path in an object
 * @template T - The type of the target object
 * @param target - The target object to modify
 * @param path - The property path (can be dot-notation string or array of keys)
 * @param value - The value to set
 * @returns The modified target object
 */
export function set<T extends object>(
  target: T,
  path: string | Array<string | number>,
  value: unknown
): T;

/**
 * Gets a value at the specified path in an object
 * @template T - The expected return type
 * @param source - The source object to read from
 * @param path - The property path (can be dot-notation string or array of keys)
 * @param defaultValue - Optional default value if path doesn't exist
 * @returns The value at the specified path or the default value
 */
export function get<T = unknown>(
  source: object,
  path: string | Array<string | number>,
  defaultValue?: T
): T;

/**
 * Default export containing both utilities
 */
declare const bundle: {
  set: typeof set;
  get: typeof get;
};

export default bundle;