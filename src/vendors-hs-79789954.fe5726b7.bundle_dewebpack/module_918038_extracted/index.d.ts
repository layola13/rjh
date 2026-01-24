/**
 * Type definitions for webpack bundle modules
 * 
 * This bundle contains utility functions for object property manipulation:
 * - get: Retrieve values from nested object paths
 * - value: Access or compute property values
 * - set: Assign values to nested object paths
 */

/**
 * Retrieves the value at a given path of an object.
 * Supports dot notation and bracket notation for nested properties.
 * 
 * @param obj - The object to query
 * @param path - The path of the property to get (e.g., 'a.b.c' or ['a', 'b', 'c'])
 * @param defaultValue - The value returned if the resolved value is undefined
 * @returns The resolved value or defaultValue
 * 
 * @example
 * const obj = { a: { b: { c: 3 } } };
 * get(obj, 'a.b.c'); // => 3
 * get(obj, ['a', 'b', 'c']); // => 3
 * get(obj, 'a.b.x', 'default'); // => 'default'
 */
export declare function get<T = unknown>(
  obj: unknown,
  path: string | readonly (string | number)[],
  defaultValue?: T
): T;

/**
 * Gets the value of an object property or computes a value.
 * Similar to get but may support additional value resolution strategies.
 * 
 * @param obj - The source object
 * @param key - The property key to access
 * @returns The property value
 */
export declare function value<T = unknown>(
  obj: Record<string, unknown>,
  key: string
): T;

/**
 * Sets the value at a given path of an object.
 * Creates intermediate objects/arrays as needed.
 * Mutates the original object.
 * 
 * @param obj - The object to modify
 * @param path - The path of the property to set (e.g., 'a.b.c' or ['a', 'b', 'c'])
 * @param value - The value to set
 * @returns The modified object
 * 
 * @example
 * const obj = { a: { b: { c: 3 } } };
 * set(obj, 'a.b.c', 4);
 * set(obj, ['x', 'y', 'z'], 5);
 */
export declare function set<T extends Record<string, unknown>>(
  obj: T,
  path: string | readonly (string | number)[],
  value: unknown
): T;