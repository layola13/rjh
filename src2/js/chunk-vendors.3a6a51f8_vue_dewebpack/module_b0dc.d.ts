/**
 * Invokes an iterator function with proper error handling and cleanup.
 * 
 * This utility ensures that if an error occurs during iteration, the iterator's
 * return method is called to properly clean up resources before re-throwing the error.
 * 
 * @template T - The type of the iterator result value
 * @template R - The return type of the callback function
 * 
 * @param iterator - The iterator object to process
 * @param callback - The function to invoke with the iterator value(s)
 * @param value - The value to pass to the callback
 * @param shouldUnpack - If true, unpacks the value as [key, value] pair; otherwise passes value directly
 * @returns The result of invoking the callback function
 * @throws Re-throws any error after calling iterator.return() for cleanup
 */
export declare function invokeIteratorCallback<T, R>(
  iterator: Iterator<T>,
  callback: (key: T, value?: T) => R,
  value: T | [T, T],
  shouldUnpack?: boolean
): R;

/**
 * Iterator interface with optional return method for cleanup.
 */
export interface Iterator<T> {
  next(): IteratorResult<T>;
  return?: () => IteratorResult<T>;
  throw?: (error?: unknown) => IteratorResult<T>;
}

/**
 * Standard iterator result type.
 */
export interface IteratorResult<T> {
  done: boolean;
  value: T;
}