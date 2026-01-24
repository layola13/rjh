/**
 * Core utility module exports
 * Provides collection manipulation and comparison functions
 */

/**
 * Retrieves a value from an object using a property path
 * @param obj - The source object to query
 * @param path - The path of the property to get (supports dot notation and array indices)
 * @param defaultValue - The value returned if the resolved value is undefined
 * @returns The resolved value or default value
 * @example
 * get({ a: { b: 2 } }, 'a.b') // returns 2
 * get({ a: [1, 2, 3] }, 'a[0]') // returns 1
 * get({}, 'a.b.c', 'default') // returns 'default'
 */
export function get<T = unknown>(
  obj: unknown,
  path: string | string[],
  defaultValue?: T
): T;

/**
 * Checks if a value is less than or equal to another value
 * @param value - The value to compare
 * @param other - The other value to compare against
 * @returns True if value is less than or equal to other, false otherwise
 * @example
 * LE(3, 5) // returns true
 * LE(5, 5) // returns true
 * LE(7, 5) // returns false
 */
export function LE(value: number, other: number): boolean;
export function LE(value: string, other: string): boolean;
export function LE<T>(value: T, other: T): boolean;

/**
 * Checks if a value is greater than or equal to another value
 * @param value - The value to compare
 * @param other - The other value to compare against
 * @returns True if value is greater than or equal to other, false otherwise
 * @example
 * GE(7, 5) // returns true
 * GE(5, 5) // returns true
 * GE(3, 5) // returns false
 */
export function GE(value: number, other: number): boolean;
export function GE(value: string, other: string): boolean;
export function GE<T>(value: T, other: T): boolean;

/**
 * Sets a value at a specified path in an object
 * Creates intermediate objects/arrays as needed
 * @param obj - The object to modify
 * @param path - The path of the property to set (supports dot notation and array indices)
 * @param value - The value to set
 * @returns The modified object
 * @example
 * set({}, 'a.b.c', 1) // returns { a: { b: { c: 1 } } }
 * set({}, 'a[0].b', 2) // returns { a: [{ b: 2 }] }
 */
export function set<T extends object>(
  obj: T,
  path: string | string[],
  value: unknown
): T;