/**
 * Polyfill for Object.hasOwn method
 * 
 * Checks if an object has a specified property as its own property (not inherited).
 * This is a safer alternative to Object.prototype.hasOwnProperty.call()
 * 
 * @module hasOwn
 */

/**
 * Determines whether an object has a property with the specified name as its own property.
 * 
 * @template T - The type of the object being checked
 * @param target - The object to check for the property
 * @param propertyKey - The name or Symbol of the property to test
 * @returns `true` if the object has the specified property as own property; otherwise, `false`
 * 
 * @example
 *