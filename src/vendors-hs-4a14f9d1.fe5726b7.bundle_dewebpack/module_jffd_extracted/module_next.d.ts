/**
 * Module: module_next
 * Original ID: next
 */

/**
 * Iterator-like class that provides sequential access to elements in an array
 * @template T The type of elements in the array
 */
declare class Iterator<T> {
  /**
   * Internal array storage
   */
  private arr: T[];
  
  /**
   * Current cursor position
   */
  private cur: number;
  
  /**
   * Returns the next element in the array and advances the cursor
   * @returns The next element in the array, or undefined if the end is reached
   */
  next(): T | undefined;
}