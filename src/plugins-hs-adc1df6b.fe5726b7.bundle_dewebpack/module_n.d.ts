/**
 * Creates an iterator function that traverses an array-like collection.
 * This is a simplified implementation of an array iterator pattern.
 * 
 * @template T - The type of elements in the collection
 * @param e - The array-like collection to iterate over
 * @param a - The current index position in the collection
 * @returns An iterator result object with `done` and `value` properties
 */
interface IteratorResult<T> {
  /** Indicates whether the iteration has completed */
  done: boolean;
  /** The current value at the iterator position (undefined when done is true) */
  value?: T;
}

/**
 * Array iterator function that returns the next element in the sequence.
 * 
 * @template T - The type of elements being iterated
 * @param collection - The array or array-like object to iterate over
 * @param currentIndex - The current position in the iteration (mutable)
 * @returns Iterator result indicating completion status and current value
 */
declare function arrayIterator<T>(
  collection: ArrayLike<T>,
  currentIndex: number
): IteratorResult<T>;

/**
 * Type definition for the iterator function.
 * Returns an iterator result based on the current index position.
 */
type ArrayIteratorFunction<T> = () => IteratorResult<T>;

/**
 * Creates a closure-based iterator for array traversal.
 * 
 * @template T - The type of elements in the array
 */
declare function createArrayIterator<T>(
  collection: ArrayLike<T>,
  startIndex: number
): ArrayIteratorFunction<T>;