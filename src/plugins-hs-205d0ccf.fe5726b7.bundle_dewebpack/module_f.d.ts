/**
 * Iterator cleanup utility module
 * Safely closes an iterator and handles any errors during the process
 */

/**
 * Iterator interface with optional return method
 * Represents any iterable object that may have cleanup logic
 */
interface IteratorWithReturn<T = unknown> {
  /** Optional method called when iterator is closed early */
  return?(): IteratorResult<T>;
}

/**
 * Iterator result returned by the return method
 */
interface IteratorResult<T> {
  /** Indicates if iteration is complete */
  done: boolean;
  /** The yielded value, if any */
  value?: T;
}

/**
 * Safely closes an iterator if it has a return method
 * Ensures proper cleanup even if an error should be rethrown
 * 
 * @param iterator - The iterator to clean up
 * @param shouldReturn - Whether to call the return method
 * @param shouldThrow - Whether to rethrow any caught error
 * @param error - The error to potentially rethrow
 * @throws The original error if shouldThrow is true
 */
declare function cleanupIterator<T>(
  iterator: IteratorWithReturn<T>,
  shouldReturn: boolean,
  shouldThrow: boolean,
  error?: Error
): void;

export { cleanupIterator, IteratorWithReturn, IteratorResult };