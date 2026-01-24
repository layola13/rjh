/**
 * Removes data associated with DOM elements from the internal cache.
 * This function is part of a data storage system that tracks information using an expando property.
 * 
 * @param target - The DOM element or object from which to remove cached data
 * @param keys - Optional key(s) to remove. Can be a string, array of strings, or undefined to remove all data
 * 
 * @remarks
 * - If no keys are provided, all data associated with the target is removed
 * - Keys are normalized to camelCase before removal
 * - When all keys are removed or object becomes empty, the expando property itself is cleaned up
 * - For DOM nodes, the expando is set to undefined; for plain objects, it's deleted
 */
export function remove(target: Element | Record<string, any>, keys?: string | string[]): void;

/**
 * Internal data cache storage interface
 */
interface DataCache {
  [key: string]: any;
}

/**
 * Utility functions used by the remove function
 */
interface Utils {
  /**
   * Converts a string to camelCase format
   * @param str - The string to convert
   * @returns The camelCase version of the string
   */
  camelCase(str: string): string;

  /**
   * Checks if an object is empty (has no own enumerable properties)
   * @param obj - The object to check
   * @returns True if the object is empty, false otherwise
   */
  isEmptyObject(obj: Record<string, any>): boolean;
}

/**
 * The expando property name used to store data on elements
 * This should be a unique identifier to avoid conflicts with other properties
 */
declare const expando: string;

/**
 * Regular expression pattern used to split space-separated strings into arrays
 * Typically matches whitespace-separated tokens
 */
declare const matchPattern: RegExp;