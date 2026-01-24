/**
 * Iterator cleanup utility module
 * Handles proper cleanup of iterators with error handling
 * @module module_f
 */

/**
 * Cleans up an iterator by calling its return method if available
 * Ensures proper resource cleanup even in error scenarios
 * 
 * @template T - The type of values yielded by the iterator
 * @param iterator - The iterator to clean up
 * @param shouldIgnoreErrors - Whether to ignore cleanup errors
 * @param hasError - Whether an error occurred during iteration
 * @param error - The error that occurred, if any
 * @throws {Error} Re-throws the original error after cleanup if hasError is true
 */
export declare function cleanupIterator<T = unknown>(
  iterator: Iterator<T> | IterableIterator<T>,
  shouldIgnoreErrors: boolean,
  hasError: boolean,
  error?: Error
): void;

/**
 * Iterator with optional return method
 * @template T - The type of values yielded by the iterator
 */
export interface CleanableIterator<T> extends Iterator<T> {
  /**
   * Optional cleanup method called when iteration is terminated early
   * @returns Result containing the final value
   */
  return?: () => IteratorResult<T>;
}

/**
 * Options for iterator cleanup behavior
 */
export interface IteratorCleanupOptions {
  /** Whether to suppress cleanup errors */
  ignoreCleanupErrors?: boolean;
  /** Whether to always call return, even on successful completion */
  alwaysCleanup?: boolean;
}

/**
 * Performs safe iterator cleanup with configurable error handling
 * 
 * @template T - The type of values yielded by the iterator
 * @param iterator - The iterator to clean up
 * @param options - Cleanup behavior options
 * @param error - Error that occurred during iteration, if any
 */
export declare function safeIteratorCleanup<T = unknown>(
  iterator: CleanableIterator<T>,
  options?: IteratorCleanupOptions,
  error?: Error
): void;