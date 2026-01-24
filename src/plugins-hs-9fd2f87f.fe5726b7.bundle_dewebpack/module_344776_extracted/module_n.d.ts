/**
 * Iterator result interface for successful iteration
 * @template T The type of value being iterated
 */
interface IteratorYieldResult<T> {
  done: false;
  value: T;
}

/**
 * Iterator result interface for completed iteration
 */
interface IteratorReturnResult {
  done: true;
  value?: undefined;
}

/**
 * Union type representing the result of an iterator operation
 * @template T The type of value being iterated
 */
type IteratorResult<T> = IteratorYieldResult<T> | IteratorReturnResult;

/**
 * Creates an iterator next function for array-like collections
 * @template T The type of elements in the collection
 * @param collection The array or array-like collection to iterate over
 * @param currentIndex Current position in the iteration (mutated by the function)
 * @returns A function that returns the next iterator result
 */
declare function createIteratorNext<T>(
  collection: ArrayLike<T>,
  currentIndex: number
): () => IteratorResult<T>;

/**
 * Iterator next method implementation
 * Returns the next value in the iteration sequence or signals completion
 * @template T The type of elements being iterated
 * @returns Iterator result containing either the next value or completion signal
 */
declare function next<T>(): IteratorResult<T>;