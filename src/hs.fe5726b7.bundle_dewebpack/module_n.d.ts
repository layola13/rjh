/**
 * Iterator next() method implementation
 * Returns the next value in the iteration sequence
 * 
 * @template T - The type of elements being iterated
 * @param {T[]} collection - The collection being iterated over
 * @param {number} currentIndex - The current position in the iteration
 * @returns {IteratorResult<T>} An object containing the iteration result
 */
declare function iteratorNext<T>(
  collection: T[],
  currentIndex: number
): IteratorResult<T>;

/**
 * Iteration result when the iterator has completed
 */
interface IteratorDoneResult {
  /** Indicates the iteration is complete */
  done: true;
  /** No value is returned when done */
  value?: undefined;
}

/**
 * Iteration result containing the next value
 * @template T - The type of the value being returned
 */
interface IteratorYieldResult<T> {
  /** Indicates more values are available */
  done: false;
  /** The current value in the iteration */
  value: T;
}

/**
 * Result type returned by iterator next() method
 * @template T - The type of values produced by the iterator
 */
type IteratorResult<T> = IteratorYieldResult<T> | IteratorDoneResult;

/**
 * Complete iterator interface
 * @template T - The type of elements being iterated
 */
interface Iterator<T> {
  /** Current index in the collection */
  currentIndex: number;
  
  /** The collection being iterated */
  collection: T[];
  
  /**
   * Advances the iterator and returns the next result
   * @returns {IteratorResult<T>} The next iteration result
   */
  next(): IteratorResult<T>;
}