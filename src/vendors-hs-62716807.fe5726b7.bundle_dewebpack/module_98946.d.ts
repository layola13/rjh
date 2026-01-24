/**
 * Promise.allSettled polyfill or wrapper implementation
 * 
 * Provides a standardized way to wait for all promises to settle (resolve or reject)
 * regardless of their outcome, returning an array of result objects.
 * 
 * @module PromiseAllSettled
 */

/**
 * Result object for a fulfilled promise
 */
interface PromiseSettledFulfilledResult<T> {
  status: 'fulfilled';
  value: T;
}

/**
 * Result object for a rejected promise
 */
interface PromiseSettledRejectedResult {
  status: 'rejected';
  reason: unknown;
}

/**
 * Union type representing any settled promise result
 */
type PromiseSettledResult<T> = 
  | PromiseSettledFulfilledResult<T> 
  | PromiseSettledRejectedResult;

/**
 * Waits for all promises to settle (either resolve or reject) and returns
 * an array of objects describing the outcome of each promise.
 * 
 * @template T - The type of values in the input promises
 * @param promises - An iterable of promises to wait for
 * @returns A promise that resolves to an array of settlement result objects
 * 
 * @example
 *