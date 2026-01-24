/**
 * Polyfill for Object.hasOwn()
 * Checks if an object has a specified property as its own property (not inherited).
 * 
 * @module ObjectHasOwn
 */

/**
 * Determines whether an object has a property with the specified name as its own property.
 * This is a polyfill that uses the native Object.hasOwn if available,
 * otherwise falls back to a safe implementation using hasOwnProperty.
 * 
 * @param target - The object to check for the property
 * @param property - The name or Symbol of the property to test
 * @returns true if the object has the specified property as own property; otherwise, false
 * 
 * @example
 *