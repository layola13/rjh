/**
 * Module: module_f
 * Cleanup utility for iterator finalization
 * Ensures proper cleanup of iterators by calling their return method
 */

/**
 * Finalizes an iterator by calling its return method if it exists
 * This is typically used in for-of loops and destructuring to ensure
 * proper cleanup when iteration is interrupted
 * 
 * @param iterator - The iterator object to finalize
 * @param shouldRethrow - Whether to rethrow any exception that occurred
 * @param exception - The exception to potentially rethrow
 * @throws The original exception if shouldRethrow is true
 */
export declare function finalizeIterator<T = unknown>(
  iterator: Iterator<T> | null | undefined,
  shouldRethrow: boolean,
  exception?: unknown
): void;

/**
 * Iterator interface for type safety
 */
export interface Iterator<T> {
  next(): IteratorResult<T>;
  return?(): IteratorResult<T>;
  throw?(error?: unknown): IteratorResult<T>;
}

/**
 * Result type for iterator operations
 */
export interface IteratorResult<T> {
  done: boolean;
  value: T;
}