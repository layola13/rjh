/**
 * Module: module_f
 * Original ID: f
 * 
 * Iterator cleanup utility function
 * Ensures proper cleanup of iterators by calling their return method
 */

/**
 * Cleanup function for iterator protocols
 * @remarks
 * This function is typically used in finally blocks to ensure
 * iterators are properly closed, even when exceptions occur
 */
declare function cleanupIterator(): void;

/**
 * Iterator state interface
 */
interface IteratorState<T = unknown> {
  /** The iterator instance being managed */
  iterator: Iterator<T> | null;
  
  /** Return method for iterator cleanup */
  return?: () => IteratorResult<T>;
}

/**
 * Error handling state
 */
interface ErrorState {
  /** Flag indicating if an error should be thrown */
  shouldThrow: boolean;
  
  /** The error object to be thrown */
  error: Error | unknown;
}

export { cleanupIterator, IteratorState, ErrorState };