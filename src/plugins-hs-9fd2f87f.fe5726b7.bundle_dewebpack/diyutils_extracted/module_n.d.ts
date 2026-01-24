/**
 * Iterator next method that traverses an array-like structure
 * @template T - The type of elements being iterated
 */
interface IteratorNextMethod<T> {
  /**
   * Advances the iterator and returns the next iteration result
   * @returns An iterator result object containing either:
   *  - { done: true } when iteration is complete
   *  - { done: false, value: T } when more elements remain
   */
  (): IteratorResult<T>;
}

/**
 * Iterator result object representing the state of iteration
 * @template T - The type of the value being iterated
 */
interface IteratorResult<T> {
  /**
   * Indicates whether the iteration has completed
   * - true: No more values available
   * - false: Current value is available in the 'value' property
   */
  done: boolean;
  
  /**
   * The current element value
   * Only present when done is false
   */
  value?: T;
}

/**
 * Creates an iterator next function for array traversal
 * @template T - The type of array elements
 * @param elements - The array to iterate over
 * @param currentIndex - Mutable reference to current iteration position
 * @returns A function that returns the next iteration result
 */
declare function createIteratorNext<T>(
  elements: ArrayLike<T>,
  currentIndex: number
): IteratorNextMethod<T>;