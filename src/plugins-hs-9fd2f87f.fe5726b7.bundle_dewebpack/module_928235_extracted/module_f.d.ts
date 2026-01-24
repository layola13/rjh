/**
 * Iterator cleanup helper function
 * Ensures proper cleanup of iterators in case of early exit or exceptions
 * Typically generated for for...of loops with try-finally blocks
 * 
 * @module module_f
 */

/**
 * Cleans up an iterator by calling its return method if available
 * and re-throwing any caught exceptions after cleanup
 * 
 * @template T - The type of values yielded by the iterator
 * @param hasError - Whether an error occurred during iteration
 * @param iterator - The iterator instance to clean up (may have optional return method)
 * @param shouldThrow - Whether to throw the caught error after cleanup
 * @param error - The error that was caught during iteration
 * @throws {unknown} Re-throws the original error after cleanup if shouldThrow is true
 */
export declare function cleanupIterator<T>(
  hasError: boolean,
  iterator: Iterator<T> | null | undefined,
  shouldThrow: boolean,
  error: unknown
): void;

/**
 * Type definition for an iterator with optional return method
 */
export interface CleanableIterator<T> extends Iterator<T> {
  return?: () => IteratorResult<T>;
}