/**
 * Module: module_f
 * Handles iterator cleanup and error propagation in generator/iterator contexts
 */

/**
 * Iterator cleanup handler that ensures proper resource disposal
 * Typically used in for-of loops or iterator consumption patterns
 * 
 * @template T - The type of values yielded by the iterator
 * @param iterator - The iterator instance to clean up
 * @param shouldReturn - Flag indicating whether to call the return method
 * @param hasError - Flag indicating an error condition occurred
 * @param error - The error object to be re-thrown if hasError is true
 * @throws Re-throws the error if hasError flag is set
 */
declare function cleanupIterator<T = unknown>(
  iterator: Iterator<T> | IterableIterator<T> | null | undefined,
  shouldReturn: boolean,
  hasError: boolean,
  error?: Error | unknown
): void;

/**
 * Type guard to check if an object has a return method (is a closeable iterator)
 */
declare function isCloseableIterator<T>(
  iterator: unknown
): iterator is { return?(): IteratorResult<T> };

/**
 * Configuration for iterator cleanup behavior
 */
interface IteratorCleanupConfig {
  /** Whether to suppress errors during cleanup */
  suppressCleanupErrors?: boolean;
  /** Whether to always call return() regardless of completion state */
  forceReturn?: boolean;
}

export { cleanupIterator, isCloseableIterator, IteratorCleanupConfig };