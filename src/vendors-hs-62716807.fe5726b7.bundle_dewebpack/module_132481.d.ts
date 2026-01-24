/**
 * Result object returned when iteration is stopped
 * @template T The type of the result value
 */
interface IterationResult<T> {
  /** Whether the iteration was stopped early */
  stopped: boolean;
  /** The result value when iteration stops */
  result: T;
}

/**
 * Options for controlling iteration behavior
 */
interface IterateOptions {
  /** Context object to bind as 'this' for the callback */
  that?: any;
  /** Whether to pass entries as separate arguments [key, value] */
  AS_ENTRIES?: boolean;
  /** Whether the input is an iterator record */
  IS_RECORD?: boolean;
  /** Whether the input is already an iterator */
  IS_ITERATOR?: boolean;
  /** Whether to support early interruption via returned objects */
  INTERRUPTED?: boolean;
}

/**
 * Callback function invoked for each iteration step
 * @template T The type of iterated values
 * @template R The return type
 * @param value The current iteration value
 * @param stopIteration Function to stop iteration and return a result
 * @returns The callback result
 */
type IterateCallback<T, R> = (
  value: T,
  stopIteration: (result: R) => IterationResult<R>
) => R | void;

/**
 * Callback for AS_ENTRIES mode
 * @template K Key type
 * @template V Value type
 * @template R Return type
 */
type EntriesCallback<K, V, R> = (
  key: K,
  value: V,
  stopIteration: (result: R) => IterationResult<R>
) => R | void;

/**
 * Iterator record structure
 * @template T The type of values yielded by the iterator
 */
interface IteratorRecord<T> {
  /** The iterator instance */
  iterator: Iterator<T>;
  /** The next method */
  next: () => IteratorResult<T>;
}

/**
 * Universal iteration utility that handles various iterable types
 * Supports arrays, iterators, and objects with custom iteration protocols
 * 
 * @template T The type of iterated values
 * @template R The callback return type
 * @param iterable The iterable object, iterator, or iterator record
 * @param callback The function to call for each iteration step
 * @param options Optional configuration for iteration behavior
 * @returns An IterationResult indicating completion status and final value
 * 
 * @throws {TypeError} If the provided value is not iterable
 */
export default function iterate<T = any, R = any>(
  iterable: Iterable<T> | Iterator<T> | IteratorRecord<T>,
  callback: IterateCallback<T, R> | EntriesCallback<any, any, R>,
  options?: IterateOptions
): IterationResult<R>;