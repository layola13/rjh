/**
 * Promise.allSettled polyfill module
 * 
 * Implements the Promise.allSettled static method which returns a promise that resolves
 * after all of the given promises have either fulfilled or rejected, with an array of
 * objects that each describe the outcome of each promise.
 * 
 * @module PromiseAllSettled
 */

/**
 * Result object for a fulfilled promise in Promise.allSettled
 */
interface PromiseAllSettledFulfilledResult<T> {
  /** Status indicator for fulfilled promise */
  status: 'fulfilled';
  /** The fulfillment value */
  value: T;
}

/**
 * Result object for a rejected promise in Promise.allSettled
 */
interface PromiseAllSettledRejectedResult {
  /** Status indicator for rejected promise */
  status: 'rejected';
  /** The rejection reason */
  reason: unknown;
}

/**
 * Union type representing the possible outcomes of Promise.allSettled
 */
type PromiseAllSettledResult<T> = 
  | PromiseAllSettledFulfilledResult<T> 
  | PromiseAllSettledRejectedResult;

/**
 * Promise.allSettled static method declaration
 * 
 * Returns a promise that resolves after all of the given promises have either
 * resolved or rejected, with an array of objects describing each promise's outcome.
 * 
 * @template T - The type of values the input promises resolve to
 * @param promises - An iterable of promises to wait for
 * @returns A promise that resolves to an array of result objects
 */
declare global {
  interface PromiseConstructor {
    /**
     * Creates a Promise that is resolved with an array of results when all
     * of the provided Promises resolve or reject.
     * 
     * @param promises - An iterable of Promises.
     * @returns A new Promise with an array of settlement results.
     */
    allSettled<T>(
      promises: Iterable<T | PromiseLike<T>>
    ): Promise<PromiseAllSettledResult<Awaited<T>>[]>;

    /**
     * Creates a Promise that is resolved with an array of results when all
     * of the provided Promises resolve or reject.
     * 
     * @param promises - An array of Promises.
     * @returns A new Promise with an array of settlement results.
     */
    allSettled<T extends readonly unknown[] | []>(
      promises: T
    ): Promise<{
      [P in keyof T]: PromiseAllSettledResult<
        Awaited<T[P]>
      >;
    }>;
  }
}

export {};