/**
 * Iterator function that traverses an array-like structure
 * Returns an IteratorResult indicating completion status and current value
 * 
 * @template T - The type of elements in the iterable
 * @returns An iterator result object with done status and optional value
 */
declare function createIterator<T>(
  collection: ArrayLike<T>,
  currentIndex: number
): IteratorResult<T, undefined>;

/**
 * Iterator result when iteration is complete
 */
interface IteratorDoneResult {
  /** Indicates iteration has completed */
  done: true;
  /** No value when done */
  value?: undefined;
}

/**
 * Iterator result when iteration is ongoing
 * @template T - The type of the yielded value
 */
interface IteratorYieldResult<T> {
  /** Indicates more values are available */
  done: false;
  /** The current value from the collection */
  value: T;
}

/**
 * Combined iterator result type
 * @template T - The type of values being iterated
 * @template TReturn - The type of the return value (default: undefined)
 */
type IteratorResult<T, TReturn = undefined> = 
  | IteratorYieldResult<T> 
  | IteratorDoneResult;

/**
 * Array-like collection interface
 * @template T - The type of elements in the collection
 */
interface ArrayLike<T> {
  /** The number of elements in the collection */
  readonly length: number;
  /** Indexed access to elements */
  readonly [index: number]: T;
}