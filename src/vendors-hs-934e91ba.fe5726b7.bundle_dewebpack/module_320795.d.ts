/**
 * Exports the native Object.getOwnPropertyDescriptor function.
 * 
 * This module provides direct access to the ECMAScript built-in method
 * for retrieving a property descriptor from an object.
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor
 */

/**
 * Retrieves the property descriptor for an own property of an object.
 * 
 * @template T - The type of the object being examined
 * @param target - The object that contains the property
 * @param propertyKey - The name or Symbol of the property
 * @returns The property descriptor if found, otherwise undefined
 * 
 * @example
 *