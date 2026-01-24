/**
 * Cleanup function for iterator resources
 * Ensures proper disposal of iterator return methods
 * 
 * @param iterator - The iterator object to cleanup
 * @param shouldThrow - Whether to throw accumulated errors
 * @param error - The error to throw if shouldThrow is true
 */
function cleanupIterator<T>(
  iterator: Iterator<T> | null | undefined,
  shouldThrow: boolean,
  error?: Error
): void {
  try {
    // Call iterator's return method if it exists
    if (iterator?.return) {
      iterator.return();
    }
  } finally {
    // Rethrow error if flagged
    if (shouldThrow && error) {
      throw error;
    }
  }
}