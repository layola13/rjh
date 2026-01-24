/**
 * Iterator cleanup helper function
 * Ensures proper cleanup of iterators by calling return() method if available
 * @throws Re-throws any exception that occurred during iteration if error flag is set
 */
declare function cleanupIterator<T = unknown>(
  iterator: Iterator<T> | null | undefined,
  shouldThrow: boolean,
  error: Error | unknown
): void;

/**
 * Type definition for iterator with optional return method
 */
interface IteratorWithReturn<T> extends Iterator<T> {
  return?(): IteratorResult<T>;
}

/**
 * Cleanup state for iterator operations
 */
interface IteratorCleanupState {
  /** Iterator instance to clean up */
  iterator: IteratorWithReturn<unknown> | null | undefined;
  /** Flag indicating whether an error occurred */
  hasError: boolean;
  /** The error to be re-thrown if hasError is true */
  error: unknown;
  /** Flag to skip cleanup (when iterator completed normally) */
  skipCleanup: boolean;
}