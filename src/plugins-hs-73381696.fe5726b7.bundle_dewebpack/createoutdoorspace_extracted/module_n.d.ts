/**
 * Iterator next method that returns the next value from a collection
 * @template T - The type of values being iterated
 */
interface IteratorNextMethod<T> {
  /**
   * Advances the iterator and returns the next result
   * @returns An iterator result object containing either a value or done flag
   */
  (): IteratorResult<T>;
}

/**
 * Creates an iterator next function for array-like collections
 * @template T - The type of elements in the collection
 * @param collection - The collection to iterate over
 * @param currentIndex - The current position in the collection (mutable)
 * @returns A function that returns the next iterator result
 */
declare function createIteratorNext<T>(
  collection: ArrayLike<T>,
  currentIndex: number
): () => IteratorResult<T, undefined>;

/**
 * Iterator result when iteration is complete
 */
interface IteratorDoneResult {
  /** Indicates iteration is complete */
  done: true;
  /** No value is returned when done */
  value?: undefined;
}

/**
 * Iterator result when a value is available
 * @template T - The type of the yielded value
 */
interface IteratorYieldResult<T> {
  /** Indicates more values are available */
  done: false;
  /** The current value from the iteration */
  value: T;
}

/**
 * Combined iterator result type
 * @template T - The type of values being iterated
 * @template TReturn - The type of the return value (default: undefined)
 */
type IteratorResult<T, TReturn = undefined> = 
  | IteratorYieldResult<T> 
  | IteratorDoneResult;