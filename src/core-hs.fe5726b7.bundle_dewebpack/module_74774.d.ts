/**
 * Polyfill for propertyIsEnumerable that handles edge cases in older environments.
 * 
 * This module provides a cross-browser compatible implementation of checking
 * whether a property is enumerable. It detects if the native propertyIsEnumerable
 * has issues (like in some older browsers where numeric properties on objects
 * may not be correctly reported as enumerable) and provides a patched version.
 * 
 * @module PropertyIsEnumerablePolyfill
 */

/**
 * Native propertyIsEnumerable method from Object.prototype
 */
const nativePropertyIsEnumerable = Object.prototype.propertyIsEnumerable;

/**
 * Native Object.getOwnPropertyDescriptor method
 */
const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

/**
 * Detects if the native propertyIsEnumerable has a bug with numeric properties.
 * Tests by checking if property '1' on object { 1: 2 } is reported as enumerable.
 * In buggy environments, this returns false when it should return true.
 */
const hasPropertyIsEnumerableBug: boolean = 
  getOwnPropertyDescriptor && 
  !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

/**
 * Checks if a property on an object is enumerable.
 * 
 * This function provides a robust way to determine if a property is enumerable,
 * working around bugs in older JavaScript environments where the native
 * propertyIsEnumerable may not correctly handle numeric property keys.
 * 
 * @param this - The object to check the property on
 * @param propertyKey - The property key to check for enumerability
 * @returns True if the property exists and is enumerable, false otherwise
 * 
 * @example
 *