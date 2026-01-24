/**
 * Creates an iterator function for array traversal.
 * This is a generator-like pattern used to iterate through array elements.
 * 
 * @template T - The type of elements in the array
 * @param e - The array to iterate over
 * @param o - The current index position (mutable state)
 * @returns An iterator result object with `done` and `value` properties
 */
declare function createArrayIterator<T>(
  array: readonly T[],
  currentIndex: number
): IteratorResult<T, undefined>;

/**
 * Result object returned by iterator operations.
 * Follows the ECMAScript Iterator protocol.
 */
interface IteratorResult<T, TReturn = unknown> {
  /**
   * Indicates whether the iteration has completed.
   * - `true`: No more values available
   * - `false`: A value is available
   */
  done: boolean;
  
  /**
   * The current value in the iteration.
   * Only present when `done` is `false`.
   */
  value?: T | TReturn;
}