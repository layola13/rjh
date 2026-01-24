/**
 * Polyfill for Object.getPrototypeOf
 * 
 * This module provides a cross-browser compatible implementation of Object.getPrototypeOf,
 * with special handling for older Internet Explorer versions that use the non-standard
 * __proto__ property (stored as IE_PROTO constant).
 * 
 * @module ObjectGetPrototypeOf
 */

/**
 * Checks if an object has a specific property
 * @param obj - The object to check
 * @param key - The property key to look for
 * @returns True if the object has the property
 */
declare function hasOwnProperty(obj: object, key: PropertyKey): boolean;

/**
 * Converts a value to an object, throwing an error if null or undefined
 * @param value - The value to convert to an object
 * @returns The value as an object
 * @throws TypeError if value is null or undefined
 */
declare function toObject(value: unknown): object;

/**
 * Retrieves the shared key used for prototype storage in IE
 * @param name - The identifier for the shared key (e.g., "IE_PROTO")
 * @returns The shared key used internally
 */
declare function getSharedKey(name: string): PropertyKey;

/**
 * Gets the prototype of an object in a cross-browser compatible way
 * 
 * Fallback strategy:
 * 1. Check for IE-specific __proto__ property (IE_PROTO)
 * 2. Check constructor.prototype if object is an instance
 * 3. Return Object.prototype for plain objects
 * 4. Return null for objects without a prototype
 * 
 * @param target - The object whose prototype should be retrieved
 * @returns The prototype of the object, or null if none exists
 */
export declare function getPrototypeOf(target: unknown): object | null;

/**
 * Native Object.getPrototypeOf or polyfill implementation
 */
export default typeof Object.getPrototypeOf === 'function'
  ? Object.getPrototypeOf
  : getPrototypeOf;