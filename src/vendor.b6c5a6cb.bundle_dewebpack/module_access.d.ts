/**
 * Module: module_access
 * Original ID: access
 * 
 * Generic accessor function that provides unified get/set interface.
 * Supports both getter and setter operations based on parameter count.
 */

/**
 * Accessor function overloads
 * 
 * @template T - The type of value being accessed
 * 
 * @param key - The property key to access
 * @returns The value associated with the key
 */
declare function access<T = unknown>(key: string): T | undefined;

/**
 * @template T - The type of value being accessed
 * 
 * @param key - The property key to access
 * @param defaultValue - Default value to return if key doesn't exist
 * @returns The value associated with the key, or defaultValue if not found
 */
declare function access<T = unknown>(key: string, defaultValue: T): T;

/**
 * @template T - The type of value being set
 * 
 * @param key - The property key to set
 * @param value - The value to set (when defaultValue is string, this is the setter signature)
 * @param newValue - The actual value to set
 * @returns The value that was set
 */
declare function access<T = unknown>(key: string, value: string, newValue: T): T;

/**
 * @template T - The type of value being set
 * 
 * @param key - The property key to set
 * @param value - The value to set
 * @param newValue - Optional third parameter
 * @returns The value that was set (newValue if provided, otherwise value)
 */
declare function access<T = unknown>(key: string, value: T, newValue?: never): T;

/**
 * Combined declaration for the access function
 * This function acts as a dual-purpose getter/setter:
 * - When called with 1-2 arguments: acts as getter (calls this.get)
 * - When called with 3 arguments: acts as setter (calls this.set)
 * 
 * @param key - The property key to access or modify
 * @param value - Optional value or default for getter; required for setter
 * @param newValue - Optional new value for setter mode
 * @returns Retrieved value (getter mode) or set value (setter mode)
 */
declare function access<T = unknown>(
    key: string,
    value?: string | T,
    newValue?: T
): T | undefined;

export default access;