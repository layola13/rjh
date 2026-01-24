/**
 * Creates an iterator for an array-like structure
 * @template T The type of elements in the collection
 */
interface ArrayIterator<T> {
  /**
   * Returns the next element in the iteration
   * @returns An iterator result containing the next value or done status
   */
  (): IteratorResult<T>;
}

/**
 * Iterator result representing either a value or the end of iteration
 * @template T The type of the yielded value
 */
type IteratorResult<T> = 
  | { done: true; value?: undefined }
  | { done: false; value: T };

/**
 * Creates an iterator function for traversing an array-like collection
 * @template T The type of elements in the array
 * @param elements The array to iterate over
 * @param startIndex The starting index for iteration (default: 0)
 * @returns An iterator function that returns the next element on each call
 */
declare function createArrayIterator<T>(
  elements: ArrayLike<T>,
  startIndex?: number
): ArrayIterator<T>;