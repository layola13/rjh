/**
 * Module: module_f
 * Cleanup utility for iterator/generator return handling
 * 
 * This module provides a helper function for safely disposing iterators
 * and handling cleanup operations with error propagation.
 */

/**
 * Iterator-like object with an optional return method
 */
interface IteratorWithReturn<T = unknown> {
  /** Optional cleanup method called when iteration is terminated early */
  return?: () => IteratorResult<T> | void;
}

/**
 * Safely executes iterator cleanup logic with error handling
 * 
 * @param i - Condition flag indicating whether cleanup should be skipped
 * @param n - Iterator object that may have a return method
 * @param s - Error flag indicating if an error should be thrown
 * @param o - Error object to be thrown if s is true
 * 
 * @throws {Error} Throws the provided error object if s is truthy
 * 
 * @remarks
 * This function is typically used in generated code for for-of loops
 * and iterator consumption to ensure proper resource cleanup.
 * 
 * The cleanup pattern follows this logic:
 * 1. If i is falsy and iterator has a return method, invoke it
 * 2. After cleanup, throw error if s flag is set
 */
declare function cleanupIterator<T = unknown>(
  i: boolean,
  n: IteratorWithReturn<T>,
  s: boolean,
  o: Error
): void;

export { cleanupIterator, IteratorWithReturn };