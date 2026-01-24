/**
 * Object property names utility module
 * Provides functionality to get own property names of an object,
 * with filtering capabilities for internal properties.
 */

/**
 * Gets the names of all own properties of an object, excluding specified internal properties.
 * This is a polyfill/wrapper for Object.getOwnPropertyNames that may filter out
 * certain properties like 'length' and 'prototype' depending on the implementation.
 * 
 * @param target - The object whose own property names are to be retrieved
 * @returns An array of strings representing all own property names
 */
export function f(target: any): string[];

/**
 * Alternative implementation: Native Object.getOwnPropertyNames or a filtered version
 * that excludes properties specified in the exclusion list (length, prototype, etc.)
 */
export const f: {
    (target: any): string[];
};

/**
 * List of property names to be excluded from enumeration
 * Typically includes: 'length', 'prototype', and other internal properties
 */
declare const EXCLUDED_PROPERTIES: readonly string[];

/**
 * Helper function that retrieves own property names while excluding specified properties
 * 
 * @param target - The target object to inspect
 * @param excludeList - Array of property names to exclude from the result
 * @returns Filtered array of property names
 */
declare function getFilteredPropertyNames(
    target: any,
    excludeList: readonly string[]
): string[];