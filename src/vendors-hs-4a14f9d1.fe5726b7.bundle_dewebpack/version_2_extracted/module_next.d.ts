/**
 * Iterator class for traversing an array sequentially
 * @template T - The type of elements in the array
 */
declare class Iterator<T> {
  /**
   * The array being iterated over
   */
  private arr: T[];

  /**
   * Current position in the array
   */
  private cur: number;

  /**
   * Retrieves the next element in the array and advances the cursor
   * @returns The next element in the array, or undefined if the end is reached
   */
  next(): T | undefined;
}

export default Iterator;