/**
 * Module re-exports for set and get utilities
 * 
 * This file provides centralized access to set and get operations
 * from their respective module implementations.
 */

/**
 * Sets a value at a specified path in an object
 * @param obj - The target object to modify
 * @param path - The path where the value should be set (e.g., 'a.b.c' or ['a', 'b', 'c'])
 * @param value - The value to set at the specified path
 * @returns The modified object
 */
export function set<T = any>(obj: Record<string, any>, path: string | Array<string | number>, value: any): T;

/**
 * Gets a value from a specified path in an object
 * @param obj - The source object to read from
 * @param path - The path to the value (e.g., 'a.b.c' or ['a', 'b', 'c'])
 * @param defaultValue - Optional default value if path doesn't exist
 * @returns The value at the specified path, or defaultValue if not found
 */
export function get<T = any>(obj: Record<string, any>, path: string | Array<string | number>, defaultValue?: T): T | undefined;