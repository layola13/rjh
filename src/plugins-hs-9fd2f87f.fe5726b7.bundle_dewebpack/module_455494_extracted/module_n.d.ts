/**
 * Iterator result interface representing the iteration state
 * @template T The type of the value being iterated
 */
interface IteratorResult<T> {
  /** Indicates whether the iteration has completed */
  done: boolean;
  /** The current value in the iteration (undefined when done is true) */
  value?: T;
}

/**
 * Array iterator function that returns iteration results
 * 
 * This iterator maintains internal state through closure variables:
 * - `e`: The array being iterated over
 * - `a`: The current index position in the array
 * 
 * @template T The type of array elements
 * @returns {IteratorResult<T>} An object indicating iteration status and current value
 * 
 * @remarks
 * Returns `{ done: true }` when iteration is complete (index >= array length)
 * Returns `{ done: false, value: T }` with the current element and increments index
 * 
 * @example
 * const arr = [1, 2, 3];
 * let index = 0;
 * const next = createIterator(arr, index);
 * const result = next(); // { done: false, value: 1 }
 */
declare function arrayIterator<T>(
  array: readonly T[],
  currentIndex: number
): IteratorResult<T>;