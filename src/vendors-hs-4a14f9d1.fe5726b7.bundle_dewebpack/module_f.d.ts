/**
 * Iterator cleanup utility module
 * Handles proper cleanup of iterator resources with error propagation
 */

/**
 * Iterator interface with optional return method
 * Represents a generator or iterator that may need cleanup
 */
interface IteratorWithReturn<T = unknown> {
  next(): IteratorResult<T>;
  return?(): IteratorResult<T>;
  throw?(error?: unknown): IteratorResult<T>;
}

/**
 * Cleanup state tracker
 */
interface CleanupState {
  /** Whether an error occurred during iteration */
  hasError: boolean;
  /** The error that was thrown, if any */
  error?: unknown;
  /** Whether cleanup should be skipped */
  skipCleanup: boolean;
}

/**
 * Safely closes an iterator and propagates any errors
 * 
 * @param iterator - The iterator to cleanup (variable 'g' in original)
 * @param skipCleanup - Whether to skip cleanup (variable 'r' in original)
 * @param hasError - Whether an error occurred (variable 'C' in original)
 * @param error - The error to propagate (variable 'o' in original)
 * @throws The original error if hasError is true
 */
export function cleanupIterator<T = unknown>(
  iterator: IteratorWithReturn<T> | null | undefined,
  skipCleanup: boolean,
  hasError: boolean,
  error?: unknown
): void;

/**
 * Module for handling iterator cleanup in generated code
 * Typically used by transpilers for for-of loop cleanup
 */
declare module 'module_f' {
  export { cleanupIterator };
}