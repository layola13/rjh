/**
 * Iterator result indicating iteration completion
 */
interface IteratorDoneResult<T> {
  done: true;
  value?: T;
}

/**
 * Iterator result containing the next value
 */
interface IteratorYieldResult<T> {
  done: false;
  value: T;
}

/**
 * Union type representing all possible iterator results
 */
type IteratorResult<T> = IteratorDoneResult<T> | IteratorYieldResult<T>;

/**
 * Creates an iterator function that traverses an array-like collection
 * @template T - The type of elements in the collection
 * @param elements - The array or array-like object to iterate over
 * @param currentIndex - The current position in the iteration
 * @returns A function that returns the next iterator result
 */
declare function createIteratorNext<T>(
  elements: ArrayLike<T>,
  currentIndex: number
): () => IteratorResult<T>;

/**
 * Returns the next element in the iteration sequence
 * @template T - The type of elements being iterated
 * @returns An iterator result object containing either the next value or completion status
 */
declare function next<T>(): IteratorResult<T>;