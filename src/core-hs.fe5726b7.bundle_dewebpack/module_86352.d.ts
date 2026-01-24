/**
 * Iterator prototype extension - find method
 * 
 * Searches for the first element in the iterator that satisfies the provided testing function.
 * Returns the first element that passes the test, otherwise returns undefined.
 */

/**
 * Predicate function type for Iterator.find
 * @template T - The type of elements in the iterator
 * @param value - The current element being processed
 * @param index - The index of the current element
 * @returns true if the element passes the test, false otherwise
 */
type IteratorFindPredicate<T> = (value: T, index: number) => boolean;

/**
 * Result type returned by the find operation
 * @template T - The type of elements in the iterator
 */
interface IteratorFindResult<T> {
  /** The found value, or undefined if not found */
  result: T | undefined;
}

/**
 * Iterator interface extension with find method
 */
interface Iterator<T> {
  /**
   * Returns the first element in the iterator that satisfies the provided testing function.
   * 
   * @param predicate - Function to test each element. 
   *                    Receives the element value and its index.
   *                    Should return true when the desired element is found.
   * @returns The first element that passes the test, or undefined if no element passes.
   * 
   * @example
   * const iterator = [1, 2, 3, 4, 5].values();
   * const found = iterator.find(value => value > 3);
   * // found === 4
   */
  find(predicate: IteratorFindPredicate<T>): T | undefined;
}

/**
 * Global Iterator constructor extension
 */
interface IteratorConstructor {
  prototype: Iterator<any>;
}

declare global {
  interface Iterator<T> {
    find(predicate: IteratorFindPredicate<T>): T | undefined;
  }
}

export {};