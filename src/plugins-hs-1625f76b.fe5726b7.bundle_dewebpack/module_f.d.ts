/**
 * Iterator cleanup utility function
 * Ensures proper cleanup of iterators by calling their return method
 * and handling any exceptions that occur during cleanup
 * 
 * @remarks
 * This function is typically used in for-of loops and other iteration contexts
 * to ensure iterators are properly disposed of, even when errors occur.
 * 
 * @param iterator - The iterator to clean up
 * @param shouldThrow - Whether an exception should be re-thrown after cleanup
 * @param error - The error to throw if shouldThrow is true
 * @throws The provided error if shouldThrow is true
 */
declare function cleanupIterator<T = unknown>(
  iterator: Iterator<T> | null | undefined,
  shouldThrow: boolean,
  error: Error
): void;

/**
 * Iterator with optional return method
 */
declare interface CleanableIterator<T> extends Iterator<T> {
  /**
   * Cleanup method called when iteration is terminated early
   * @returns Result of the cleanup operation
   */
  return?(): IteratorResult<T>;
}

/**
 * Parameters for iterator cleanup operation
 */
declare interface IteratorCleanupContext<T = unknown> {
  /** The iterator instance to clean up */
  readonly iterator: CleanableIterator<T> | null | undefined;
  
  /** Flag indicating whether to throw the error after cleanup */
  readonly shouldThrow: boolean;
  
  /** The error instance to be thrown if shouldThrow is true */
  readonly error: Error;
}

/**
 * Performs safe cleanup of an iterator
 * @param context - The cleanup context containing iterator and error information
 */
declare function performIteratorCleanup<T = unknown>(
  context: IteratorCleanupContext<T>
): void;

export { cleanupIterator, performIteratorCleanup, CleanableIterator, IteratorCleanupContext };