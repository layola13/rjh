/**
 * Array length setter utility with read-only protection
 * 
 * This module provides a safe way to set array length property,
 * handling environments where array length may be read-only.
 * 
 * @module ArrayLengthSetter
 */

/**
 * Checks if the JavaScript engine properly enforces non-writable array length.
 * 
 * In strict mode, some engines allow setting read-only properties without throwing,
 * while others correctly throw TypeError. This constant determines the behavior.
 * 
 * @returns {boolean} True if the engine properly throws on read-only length modification
 */
declare const ENFORCES_READONLY_LENGTH: boolean;

/**
 * Determines if a value is an array or array-like object.
 * 
 * @param value - The value to check
 * @returns True if the value is an array
 */
declare function isArray(value: unknown): value is unknown[];

/**
 * Retrieves the property descriptor for a given object property.
 * 
 * @param target - The object containing the property
 * @param propertyKey - The name of the property
 * @returns The property descriptor, or undefined if not found
 */
declare function getOwnPropertyDescriptor(
  target: object,
  propertyKey: PropertyKey
): PropertyDescriptor | undefined;

/**
 * Safely sets the length property of an array.
 * 
 * In environments that enforce read-only properties, this function checks
 * if the length property is writable before attempting to set it.
 * Throws TypeError if trying to modify a read-only length property.
 * 
 * @param target - The array whose length should be modified
 * @param newLength - The new length value to set
 * @returns The new length value
 * @throws {TypeError} If the array's length property is read-only
 * 
 * @example
 *