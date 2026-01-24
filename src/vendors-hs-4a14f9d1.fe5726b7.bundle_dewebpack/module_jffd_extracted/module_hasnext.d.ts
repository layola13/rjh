/**
 * Iterator or cursor interface for array traversal
 * Provides methods to check if there are more elements to iterate
 */
interface ArrayIterator<T = unknown> {
  /**
   * Current cursor position in the array
   */
  cur: number;

  /**
   * The array being iterated
   */
  arr: T[];

  /**
   * Checks if there are more elements to iterate
   * @returns true if the current position is less than the array length, false otherwise
   */
  hasNext(): boolean;
}

/**
 * Checks if the iterator has more elements
 * @this {ArrayIterator} The iterator context
 * @returns true if current position is within array bounds
 */
declare function hasNext<T>(this: ArrayIterator<T>): boolean;

export { ArrayIterator, hasNext };