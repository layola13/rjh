/**
 * Module: module_set
 * A module for setting values in a collection
 */

/**
 * Sets a value in the target collection at the specified key
 * @param target - The target object to store the value
 * @param key - The key/index where the value should be stored
 * @param value - The value to be stored
 */
export function setModuleValue<T>(
  target: Record<string | number, T>,
  key: string | number,
  value: T
): void {
  target[key] = value;
}