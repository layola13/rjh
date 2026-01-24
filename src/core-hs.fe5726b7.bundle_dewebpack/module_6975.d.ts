/**
 * Iteration result wrapper for controlling iteration flow.
 * Used to signal early termination and carry the final result.
 */
interface IterationResult<T> {
  /** Indicates whether the iteration was stopped early */
  stopped: boolean;
  /** The result value when iteration is stopped */
  result: T;
}

/**
 * Options for configuring the iterate behavior.
 */
interface IterateOptions {
  /** The context (this value) to bind to the iterator function */
  that?: any;
  /** If true, pass entries as [key, value] pairs to the iterator function */
  AS_ENTRIES?: boolean;
  /** If true, treat the input as an iterator record with .iterator and .next properties */
  IS_RECORD?: boolean;
  /** If true, treat the input as an iterator directly */
  IS_ITERATOR?: boolean;
  /** If true, allow the iterator function to interrupt/stop iteration early */
  INTERRUPTED?: boolean;
}

/**
 * Universal iteration helper that abstracts over different iterable types.
 * Supports arrays, iterables, iterator records, and raw iterators.
 * Allows early termination through the INTERRUPTED option.
 *
 * @template T - The type of elements being iterated
 * @template R - The return type of the iterator function
 * 
 * @param iterable - The iterable object, iterator record, or iterator to process
 * @param iteratorFunction - Function called for each element
 * @param options - Configuration options for iteration behavior
 * 
 * @returns An IterationResult indicating completion status and final result
 * 
 * @throws {TypeError} If the input is not iterable
 * 
 * @example
 * // Simple iteration
 * iterate([1, 2, 3], (value) => console.log(value));
 * 
 * @example
 * // Early termination
 * iterate([1, 2, 3], (value, stop) => {
 *   if (value === 2) return stop(value);
 * }, { INTERRUPTED: true });
 */
declare function iterate<T = any, R = any>(
  iterable: Iterable<T> | Iterator<T> | { iterator: Iterator<T>; next: () => IteratorResult<T> },
  iteratorFunction: (value: T, stop?: (result: R) => IterationResult<R>) => void | IterationResult<R>,
  options?: IterateOptions
): IterationResult<R>;

export = iterate;