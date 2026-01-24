/**
 * Array iterator implementation
 * Iterates over array elements sequentially
 * 
 * @module module_n
 * @original_id n
 */

/**
 * Iterator result type for done state
 */
export interface IteratorDoneResult {
  done: true;
  value?: undefined;
}

/**
 * Iterator result type for value state
 */
export interface IteratorValueResult<T> {
  done: false;
  value: T;
}

/**
 * Combined iterator result type
 */
export type IteratorResult<T> = IteratorDoneResult | IteratorValueResult<T>;

/**
 * Creates an iterator next function for array traversal
 * 
 * @template T - The type of elements in the array
 * @param elements - The array to iterate over
 * @param currentIndex - Current position in the array (mutable reference)
 * @returns A function that returns the next iterator result
 */
export declare function createArrayIteratorNext<T>(
  elements: T[],
  currentIndex: number
): () => IteratorResult<T>;

/**
 * Array iterator class
 * 
 * @template T - The type of elements in the array
 */
export declare class ArrayIterator<T> implements Iterator<T> {
  private readonly elements: T[];
  private currentIndex: number;

  /**
   * Creates a new array iterator
   * @param elements - The array to iterate over
   */
  constructor(elements: T[]);

  /**
   * Gets the next value from the iterator
   * @returns Iterator result containing either a value or done signal
   */
  next(): IteratorResult<T>;
}