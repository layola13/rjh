/**
 * Iterator cleanup helper function
 * Ensures proper cleanup of iterators by calling the return method if available
 * and handling any exceptions that occur during cleanup
 * 
 * @remarks
 * This is typically used in generated code for for-of loops and other iterator
 * consumption patterns to ensure resources are properly released
 * 
 * @param normalCompletion - Indicates if the iteration completed normally (true) or was interrupted (false)
 * @param iterator - The iterator object that may need cleanup
 * @param errorOccurred - Flag indicating if an error occurred during iteration
 * @param thrownError - The error that was thrown, if any
 * @throws Re-throws the original error after cleanup if an error occurred
 */
declare function cleanupIterator<T = unknown>(
  normalCompletion: boolean,
  iterator: Iterator<T> | null | undefined,
  errorOccurred: boolean,
  thrownError?: unknown
): void;

/**
 * Iterator return result
 */
interface IteratorReturnResult<TReturn = unknown> {
  done: true;
  value: TReturn;
}

/**
 * Iterator yield result
 */
interface IteratorYieldResult<TYield = unknown> {
  done?: false;
  value: TYield;
}

/**
 * Iterator interface
 */
interface Iterator<T = unknown, TReturn = unknown, TNext = undefined> {
  next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
  return?(value?: TReturn): IteratorResult<T, TReturn>;
  throw?(e?: unknown): IteratorResult<T, TReturn>;
}

/**
 * Iterator result type
 */
type IteratorResult<T, TReturn = unknown> = 
  | IteratorYieldResult<T> 
  | IteratorReturnResult<TReturn>;