/**
 * Iterator wrapper interface that binds an iterator with its next method.
 * Provides a convenient way to work with iterators by pre-binding the next method.
 * 
 * @template T The type of values yielded by the iterator
 */
interface IteratorWrapper<T> {
  /**
   * The original iterator object
   */
  iterator: Iterator<T>;
  
  /**
   * Pre-bound next method from the iterator
   * Returns the next result from the iteration sequence
   */
  next: () => IteratorResult<T>;
}

/**
 * Creates an iterator wrapper that provides a bound next method for easier iteration.
 * This utility function binds the iterator's next method to the iterator instance,
 * allowing the next method to be called independently without losing context.
 * 
 * @template T The type of values yielded by the iterator
 * @param iterator - The iterator to wrap
 * @returns An object containing both the original iterator and its bound next method
 * 
 * @example
 * const arr = [1, 2, 3];
 * const iter = arr[Symbol.iterator]();
 * const wrapped = createIteratorWrapper(iter);
 * console.log(wrapped.next()); // { value: 1, done: false }
 */
declare function createIteratorWrapper<T>(iterator: Iterator<T>): IteratorWrapper<T>;

export = createIteratorWrapper;