/**
 * Type definitions for webpack bundle modules
 * Contains re-exported types for set, LE, get, and GE modules
 */

/**
 * Set module - Provides functionality for setting values
 */
declare module 'module_set' {
  /**
   * Sets a value in a collection or data structure
   * @param key - The key or identifier for the value
   * @param value - The value to set
   * @returns The updated collection or confirmation of the operation
   */
  export function set<T = unknown>(key: string | number, value: T): boolean | void;
  
  export default set;
}

/**
 * LE module - Provides less than or equal comparison functionality
 */
declare module 'module_le' {
  /**
   * Performs less than or equal (≤) comparison
   * @param a - First value to compare
   * @param b - Second value to compare
   * @returns True if a is less than or equal to b
   */
  export function LE<T extends number | string | Date>(a: T, b: T): boolean;
  
  export default LE;
}

/**
 * Get module - Provides functionality for retrieving values
 */
declare module 'module_get' {
  /**
   * Retrieves a value from a collection or data structure
   * @param key - The key or identifier for the value
   * @param defaultValue - Optional default value if key is not found
   * @returns The retrieved value or default value
   */
  export function get<T = unknown>(key: string | number, defaultValue?: T): T | undefined;
  
  export default get;
}

/**
 * GE module - Provides greater than or equal comparison functionality
 */
declare module 'module_ge' {
  /**
   * Performs greater than or equal (≥) comparison
   * @param a - First value to compare
   * @param b - Second value to compare
   * @returns True if a is greater than or equal to b
   */
  export function GE<T extends number | string | Date>(a: T, b: T): boolean;
  
  export default GE;
}

/**
 * Main bundle exports
 */
export { set } from 'module_set';
export { LE } from 'module_le';
export { get } from 'module_get';
export { GE } from 'module_ge';

/**
 * Default export containing all module functions
 */
export default {
  set,
  LE,
  get,
  GE
};