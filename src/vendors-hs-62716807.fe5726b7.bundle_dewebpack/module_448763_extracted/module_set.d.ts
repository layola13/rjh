/**
 * Module: module_set
 * A module for setting values
 */

/**
 * Sets a value to an internal storage
 * @param value - The value to be stored
 */
export function set<T>(value: T): void;

/**
 * Alternative: If this is a setter that returns the value
 * @param value - The value to be stored
 * @returns The stored value
 */
export function set<T>(value: T): T;

/**
 * Alternative: If 'n' is an exported mutable variable
 */
export let currentValue: unknown;

/**
 * Alternative: Default export as a function
 */
declare function set<T>(value: T): void;
export default set;