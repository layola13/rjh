/**
 * Module: module_set
 * Sets a value in a collection/registry by key
 * @module set
 */

/**
 * Sets a value at the specified key in the target object
 * @param target - The target object to set the value on
 * @param key - The key/property name to set
 * @param value - The value to be stored
 */
declare function set<T = unknown>(
  target: Record<string | number | symbol, T>,
  key: string | number | symbol,
  value: T
): void;

export default set;