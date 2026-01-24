/**
 * Iterator-like class that provides sequential access to array elements.
 * Module: module_next (Original ID: next)
 */
declare class ArrayIterator<T> {
  /**
   * Internal array storage
   */
  private arr: T[];
  
  /**
   * Current cursor position in the array
   */
  private cur: number;
  
  /**
   * Returns the next element in the array and advances the cursor.
   * 
   * @returns The next element, or undefined if the cursor exceeds array bounds
   * 
   * @example
   *