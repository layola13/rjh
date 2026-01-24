/**
 * Iterator cleanup utility module
 * Handles proper cleanup of iterators with return method invocation
 * 
 * @module module_f
 */

/**
 * Cleans up an iterator by calling its return method if available
 * This is typically used in for-of loops or when manually consuming iterators
 * to ensure proper resource cleanup
 * 
 * @template T - The type of values yielded by the iterator
 * @param iterator - The iterator to clean up
 * @param hasError - Flag indicating whether an error occurred during iteration
 * @param error - The error that occurred, if any
 * @throws Re-throws the error if hasError is true
 */
export declare function cleanupIterator<T = unknown>(
  iterator: Iterator<T> | null | undefined,
  hasError: boolean,
  error?: unknown
): void;

/**
 * Type guard to check if an object has a return method (is a returnable iterator)
 * 
 * @template T - The type of values yielded by the iterator
 * @param iterator - The iterator to check
 * @returns True if the iterator has a callable return method
 */
export declare function hasReturnMethod<T = unknown>(
  iterator: Iterator<T> | null | undefined
): iterator is Iterator<T> & { return(): IteratorResult<T> };

/**
 * Options for iterator cleanup behavior
 */
export interface IteratorCleanupOptions {
  /** Whether to suppress errors from the return method */
  suppressReturnErrors?: boolean;
  /** Whether to always call return, even if no error occurred */
  alwaysReturn?: boolean;
}

/**
 * Advanced iterator cleanup with configurable options
 * 
 * @template T - The type of values yielded by the iterator
 * @param iterator - The iterator to clean up
 * @param hasError - Flag indicating whether an error occurred
 * @param error - The error that occurred, if any
 * @param options - Cleanup behavior options
 */
export declare function cleanupIteratorWithOptions<T = unknown>(
  iterator: Iterator<T> | null | undefined,
  hasError: boolean,
  error: unknown,
  options?: IteratorCleanupOptions
): void;