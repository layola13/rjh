/**
 * Polyfill for Object.getOwnPropertyNames
 * 
 * This module provides a fallback implementation for retrieving all property names
 * (including non-enumerable properties) of an object, excluding only 'length' and 'prototype'.
 * 
 * @module ObjectGetOwnPropertyNames
 */

/**
 * List of standard property names to exclude from enumeration
 * Combines properties from module 668050 with 'length' and 'prototype'
 */
type ExcludedPropertyNames = readonly string[];

/**
 * Function that retrieves own property names of an object
 * 
 * @param target - The object whose property names should be retrieved
 * @returns An array of strings representing all own property names
 */
type GetOwnPropertyNamesFunction = (target: object) => string[];

/**
 * Internal helper function for getting property names with exclusions
 * 
 * @param target - The object to inspect
 * @param excludedProps - Array of property names to exclude from the result
 * @returns Array of own property names excluding the specified properties
 */
declare function getOwnPropertyNamesWithExclusions(
  target: object,
  excludedProps: ExcludedPropertyNames
): string[];

/**
 * Exported property names getter
 * Uses native Object.getOwnPropertyNames if available, otherwise falls back to custom implementation
 */
export const f: GetOwnPropertyNamesFunction;

/**
 * Module exports interface
 */
export interface ObjectGetOwnPropertyNamesModule {
  /**
   * Function to get all own property names of an object
   */
  f: GetOwnPropertyNamesFunction;
}