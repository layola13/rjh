/**
 * Iterator next method that traverses an array-like collection
 * Returns an IteratorResult indicating whether iteration is complete
 * 
 * @returns IteratorResult with done status and current value
 */
declare function next<T>(): IteratorResult<T>;

/**
 * Result object returned by iterator operations
 * @template T - The type of value being iterated
 */
interface IteratorResult<T> {
  /**
   * Indicates whether the iterator has completed traversal
   */
  done: boolean;
  
  /**
   * The current value from the collection (undefined when done is true)
   */
  value?: T;
}

/**
 * Context variables used by the iterator
 * @template T - The type of elements in the collection
 */
interface IteratorContext<T> {
  /**
   * Current iteration index
   */
  currentIndex: number;
  
  /**
   * The collection being iterated
   */
  collection: ArrayLike<T>;
}