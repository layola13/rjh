/**
 * Polyfill for propertyIsEnumerable that handles edge cases in older environments.
 * 
 * This module provides a cross-browser compatible implementation of checking
 * whether a property is enumerable on an object. It detects if the native
 * propertyIsEnumerable has issues (older browsers) and provides a fallback.
 * 
 * @module PropertyIsEnumerablePolyfill
 */

/**
 * Checks if a given property on an object is enumerable.
 * 
 * @param propertyKey - The property name or symbol to check
 * @returns True if the property exists and is enumerable, false otherwise
 */
type PropertyIsEnumerableFn = (this: unknown, propertyKey: PropertyKey) => boolean;

/**
 * Export interface for the polyfill module.
 */
interface PropertyIsEnumerableExport {
  /** The propertyIsEnumerable function (either native or polyfilled) */
  f: PropertyIsEnumerableFn;
}

/**
 * Native propertyIsEnumerable method from Object.prototype
 */
const nativePropertyIsEnumerable = Object.prototype.propertyIsEnumerable;

/**
 * Native Object.getOwnPropertyDescriptor function
 */
const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

/**
 * Feature detection: Check if native propertyIsEnumerable is broken.
 * 
 * In some older environments, propertyIsEnumerable incorrectly returns false
 * for numeric properties. This tests if the bug exists by checking if
 * propertyIsEnumerable correctly identifies enumerable numeric keys.
 */
const hasPropertyIsEnumerableBug: boolean = 
  getOwnPropertyDescriptor && 
  !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

/**
 * Polyfilled propertyIsEnumerable implementation.
 * Uses getOwnPropertyDescriptor to check the enumerable flag directly.
 * 
 * @param propertyKey - The property to check
 * @returns True if property exists and is enumerable
 */
const polyfillPropertyIsEnumerable: PropertyIsEnumerableFn = function(
  this: unknown,
  propertyKey: PropertyKey
): boolean {
  const descriptor = getOwnPropertyDescriptor(this, propertyKey);
  return !!descriptor && descriptor.enumerable;
};

/**
 * Exported propertyIsEnumerable function.
 * Uses polyfill if native implementation is broken, otherwise uses native.
 */
export const f: PropertyIsEnumerableFn = hasPropertyIsEnumerableBug
  ? polyfillPropertyIsEnumerable
  : nativePropertyIsEnumerable;