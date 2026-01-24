/**
 * Iterator result type that indicates completion with no value
 */
interface IteratorReturnResult<TReturn> {
  done: true;
  value?: TReturn;
}

/**
 * Iterator result type that yields a value
 */
interface IteratorYieldResult<TYield> {
  done: false;
  value: TYield;
}

/**
 * Union type representing either a yield or return result
 */
type IteratorResult<TYield, TReturn = unknown> =
  | IteratorYieldResult<TYield>
  | IteratorReturnResult<TReturn>;

/**
 * Creates an iterator function for an array-like structure
 * @template T - The type of elements in the array
 * @param items - The array to iterate over
 * @param currentIndex - The current iteration index (mutable reference)
 * @returns An iterator result indicating done status and current value
 */
declare function createArrayIterator<T>(
  items: ArrayLike<T>,
  currentIndex: number
): IteratorResult<T, undefined>;

/**
 * Generic iterator interface
 * @template T - The type of values yielded by the iterator
 * @template TReturn - The type of the final return value
 * @template TNext - The type of values that can be passed to next()
 */
interface Iterator<T, TReturn = unknown, TNext = undefined> {
  /**
   * Advances the iterator and returns the next result
   * @param args - Optional value to send to the iterator
   * @returns The next iteration result
   */
  next(...args: [] | [TNext]): IteratorResult<T, TReturn>;

  /**
   * Returns the given value and finishes the iterator
   * @param value - The value to return
   * @returns A done iteration result
   */
  return?(value?: TReturn): IteratorResult<T, TReturn>;

  /**
   * Throws an error into the iterator
   * @param e - The error to throw
   * @returns An iteration result
   */
  throw?(e?: unknown): IteratorResult<T, TReturn>;
}