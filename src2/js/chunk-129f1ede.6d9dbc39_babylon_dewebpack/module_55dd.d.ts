/**
 * Array.prototype.sort polyfill module
 * 
 * This module provides a standardized implementation of Array.sort() that handles
 * edge cases (sorting with undefined/null comparators) consistently across environments.
 * 
 * @module ArraySortPolyfill
 */

/**
 * Type definition for a comparison function used in array sorting
 * 
 * @template T - The type of elements being compared
 * @param a - First element to compare
 * @param b - Second element to compare
 * @returns A negative number if a < b, positive if a > b, or 0 if equal
 */
type CompareFn<T = any> = (a: T, b: T) => number;

/**
 * Module exports interface for the Array.sort polyfill
 */
declare module 'module_55dd' {
  /**
   * Polyfills Array.prototype.sort to handle edge cases with undefined/null comparators
   * 
   * This implementation ensures:
   * - Calling sort(undefined) uses default comparison
   * - Calling sort(null) throws an error (validates comparator)
   * - The comparator function is properly validated before use
   * 
   * @remarks
   * This polyfill is applied only when the native implementation has issues:
   * - Accepts undefined without falling back to default sort
   * - Accepts null without throwing an error
   * - Doesn't properly validate the sort function
   * 
   * @example
   *