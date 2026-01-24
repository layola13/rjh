/**
 * Polyfill for Object.getOwnPropertyNames
 * 
 * This module provides a fallback implementation for retrieving all property names
 * (including non-enumerable properties) of an object, excluding inherited properties.
 * 
 * @module ObjectGetOwnPropertyNames
 */

/**
 * List of additional property names to exclude from enumeration.
 * Extends the base exclusion list with 'length' and 'prototype'.
 */
const EXCLUDED_PROPERTIES: readonly string[] = [
  ...getBaseExcludedProperties(),
  "length",
  "prototype"
] as const;

/**
 * Gets the base list of properties to exclude from enumeration.
 * This would typically include built-in properties that should not be enumerated.
 * 
 * @returns Array of property names to exclude
 */
declare function getBaseExcludedProperties(): readonly string[];

/**
 * Gets own property names using internal enumeration logic.
 * 
 * @param target - The object whose property names should be retrieved
 * @param exclusions - Array of property names to exclude from the result
 * @returns Array of own property names
 */
declare function getOwnPropertyNamesInternal(
  target: object,
  exclusions: readonly string[]
): string[];

/**
 * Retrieves all own property names of an object, including non-enumerable properties.
 * 
 * This is a polyfill that uses the native Object.getOwnPropertyNames if available,
 * otherwise falls back to a custom implementation.
 * 
 * @param target - The object whose own property names are to be retrieved
 * @returns An array of strings representing all own property names
 * 
 * @example
 *