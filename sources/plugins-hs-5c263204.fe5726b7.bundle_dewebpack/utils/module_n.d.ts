/**
 * Iterator next method that traverses an array-like collection
 * 
 * @template T - The type of elements in the collection
 * @param {ArrayLike<T>} collection - The collection being iterated
 * @param {number} currentIndex - The current position in the iteration
 * @returns {IteratorResult<T>} The result containing either the next value or done signal
 * 
 * @example
 * const result = iteratorNext(myArray, 0);
 * if (!result.done) {
 *   console.log(result.value);
 * }
 */
declare function iteratorNext<T>(
  collection: ArrayLike<T>,
  currentIndex: number
): IteratorResult<T>;

/**
 * Iterator result interface
 * Represents the result of a single iteration step
 */
interface IteratorResult<T> {
  /** Indicates whether the iteration has completed */
  done: boolean;
  /** The current value (undefined when done is true) */
  value?: T;
}

/**
 * Array-like structure that can be indexed
 */
interface ArrayLike<T> {
  readonly length: number;
  readonly [index: number]: T;
}