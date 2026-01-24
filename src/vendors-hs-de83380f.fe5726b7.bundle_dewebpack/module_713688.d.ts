/**
 * Get property helper for inheritance chains
 * 
 * Provides a polyfill for Reflect.get that traverses the prototype chain
 * to retrieve property values, respecting getter functions.
 * 
 * @module PropertyAccessHelper
 */

/**
 * Retrieves a property value from an object or its prototype chain.
 * 
 * This function mimics Reflect.get behavior:
 * - Traverses the prototype chain to find the property
 * - If the property has a getter, calls it with the correct receiver
 * - Otherwise returns the property value directly
 * 
 * @template T - The target object type
 * @template K - The property key type
 * 
 * @param target - The object to retrieve the property from
 * @param propertyKey - The name of the property to retrieve
 * @param receiver - The value to use as `this` when calling getter functions (defaults to target)
 * 
 * @returns The property value, or undefined if not found
 * 
 * @example
 *