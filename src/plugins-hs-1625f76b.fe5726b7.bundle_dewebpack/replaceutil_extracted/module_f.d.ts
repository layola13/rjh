/**
 * Iterator cleanup utility module
 * Ensures proper cleanup of iterators by calling return() method if available
 * 
 * @module module_f
 * @remarks
 * This module handles the safe cleanup of iterators, particularly when
 * iteration is interrupted (e.g., by break, return, or exception).
 * It follows the iterator protocol defined in ECMAScript specification.
 */

/**
 * Cleanup configuration for iterator termination
 */
interface IteratorCleanupContext {
  /** Whether cleanup should be performed */
  shouldCleanup: boolean;
  /** The iterator instance to clean up */
  iterator: Iterator<unknown> | null;
  /** Whether an error occurred during iteration */
  hasError: boolean;
  /** The error that occurred, if any */
  error?: unknown;
}

/**
 * Safely cleans up an iterator by calling its return method if available
 * 
 * @param shouldCleanup - Whether to perform cleanup (typically false for normal completion)
 * @param iterator - The iterator to clean up
 * @param hasError - Whether an error occurred that should be re-thrown
 * @param error - The error to re-throw if hasError is true
 * @throws Re-throws the original error after cleanup if hasError is true
 */
export declare function cleanupIterator(
  shouldCleanup: boolean,
  iterator: Iterator<unknown> | null | undefined,
  hasError: boolean,
  error?: unknown
): void;

/**
 * Type guard to check if an object has a return method (is a closeable iterator)
 */
export declare function hasReturnMethod(
  iterator: unknown
): iterator is { return(): IteratorResult<unknown> };