/**
 * Iterator result type for array-like iteration
 * @template T The type of values being iterated
 */
interface IteratorResult<T> {
  /** Indicates whether the iteration is complete */
  done: boolean;
  /** The current value in the iteration (undefined when done is true) */
  value?: T;
}

/**
 * Creates an iterator function for array-like collections
 * @template T The type of elements in the collection
 * @param collection The array or array-like collection to iterate over
 * @returns An iterator function that returns the next element on each call
 */
declare function createArrayIterator<T>(
  collection: ArrayLike<T>
): () => IteratorResult<T>;

/**
 * Iterator implementation for traversing array-like structures
 * @template T The type of elements being iterated
 */
declare class ArrayIterator<T> {
  private readonly collection: ArrayLike<T>;
  private currentIndex: number;

  /**
   * Creates a new array iterator
   * @param collection The collection to iterate over
   */
  constructor(collection: ArrayLike<T>);

  /**
   * Returns the next element in the iteration
   * @returns An iterator result containing the next value or done status
   */
  next(): IteratorResult<T>;

  /**
   * Resets the iterator to the beginning
   */
  reset(): void;

  /**
   * Checks if there are more elements to iterate
   */
  hasNext(): boolean;
}

/**
 * Type alias for array-like structures
 */
type ArrayLike<T> = {
  readonly length: number;
  readonly [index: number]: T;
};