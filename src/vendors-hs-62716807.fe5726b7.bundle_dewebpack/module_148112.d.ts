/**
 * Promise.all polyfill implementation
 * 
 * This module provides a polyfill for the Promise.all static method,
 * which creates a Promise that is resolved with an array of results
 * when all of the provided Promises resolve, or rejected when any Promise rejects.
 * 
 * @module PromiseAllPolyfill
 */

/**
 * Type definition for a callable function that can be invoked
 */
type AnyCallable = (...args: any[]) => any;

/**
 * Represents the internal structure of a Promise capability record
 */
interface PromiseCapability<T> {
  /** The promise instance */
  promise: Promise<T>;
  /** Function to resolve the promise */
  resolve: (value: T | PromiseLike<T>) => void;
  /** Function to reject the promise */
  reject: (reason?: any) => void;
}

/**
 * Represents a deferred operation result wrapper
 */
interface DeferredResult<T> {
  /** Indicates if an error occurred during execution */
  error: boolean;
  /** The resulting value or error */
  value: T | Error;
}

/**
 * Promise.all static method polyfill
 * 
 * Takes an iterable of promises and returns a single Promise that resolves
 * when all input promises have resolved, or rejects when any input promise rejects.
 * 
 * @template T - The type of values in the resolved promise array
 * @param iterable - An iterable object such as an Array of promises
 * @returns A promise that resolves to an array of the resolved values
 * 
 * @example
 *