/**
 * Iterator next method that traverses through an array-like collection
 * @template T - The type of elements in the collection
 */
interface IteratorNextMethod<T> {
  /**
   * Advances the iterator and returns the next result
   * @returns An iterator result object containing either a value or done flag
   */
  (): IteratorResult<T>;
}

/**
 * Result object returned by iterator's next() method
 * @template T - The type of the yielded value
 */
interface IteratorResult<T> {
  /** Indicates whether the iterator has completed */
  done: boolean;
  /** The current value from the iterator (undefined when done is true) */
  value?: T;
}

/**
 * Iterator implementation for array-like collections
 * @template T - The type of elements being iterated
 */
declare class ArrayIterator<T> {
  /** Current position in the collection */
  private currentIndex: number;
  
  /** The collection being iterated */
  private readonly collection: ArrayLike<T>;

  /**
   * Creates a new array iterator
   * @param collection - The array-like collection to iterate over
   */
  constructor(collection: ArrayLike<T>);

  /**
   * Returns the next element in the iteration
   * @returns Object with 'done' flag and optional 'value'
   * - When done is false: returns { done: false, value: T }
   * - When done is true: returns { done: true }
   */
  next(): IteratorResult<T>;
}

/**
 * Array-like structure with indexed access and length property
 * @template T - The type of elements in the collection
 */
interface ArrayLike<T> {
  readonly length: number;
  readonly [index: number]: T;
}