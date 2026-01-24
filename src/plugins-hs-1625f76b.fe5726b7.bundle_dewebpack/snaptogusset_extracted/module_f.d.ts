/**
 * Iterator cleanup utility module
 * Handles proper cleanup of iterators by calling their return method
 * @module module_f
 */

/**
 * Cleans up an iterator by calling its return method if available.
 * Ensures proper resource cleanup even when errors occur.
 * 
 * @template T - The type of values yielded by the iterator
 * @param iterator - The iterator object to clean up
 * @param shouldThrow - Whether to throw the caught error after cleanup
 * @param errorToThrow - The error to throw if shouldThrow is true
 * @throws {Error} Rethrows the error if shouldThrow is true
 */
export function cleanupIterator<T>(
  iterator: Iterator<T> | null | undefined,
  shouldThrow: boolean,
  errorToThrow: Error | unknown
): void;

/**
 * Type guard to check if an object has a return method (is a proper iterator)
 * @param obj - The object to check
 * @returns True if the object has a callable return method
 */
export function hasReturnMethod(obj: unknown): obj is { return(): IteratorResult<unknown> };