/**
 * Iterator function that traverses an array-like structure
 * Returns iterator result objects following the ES2015 iteration protocol
 * 
 * @template T - The type of elements in the array
 * @returns An IteratorResult object with done flag and optional value
 */
declare function createIterator<T>(): IteratorResult<T, undefined>;

/**
 * Iterator result type for completed iteration
 */
interface DoneIteratorResult {
  /** Indicates iteration is complete */
  done: true;
  /** No value when iteration is done */
  value?: undefined;
}

/**
 * Iterator result type for ongoing iteration
 * @template T - The type of the yielded value
 */
interface ValueIteratorResult<T> {
  /** Indicates iteration is not complete */
  done: false;
  /** The current element from the array */
  value: T;
}

/**
 * Combined iterator result type
 * @template T - The type of elements being iterated
 */
type IteratorResult<T, TReturn = undefined> = 
  | ValueIteratorResult<T> 
  | DoneIteratorResult;

/**
 * State variables for the iterator (typically closure variables)
 */
declare const I: number;  // Current index position
declare const A: readonly unknown[];  // Source array being iterated