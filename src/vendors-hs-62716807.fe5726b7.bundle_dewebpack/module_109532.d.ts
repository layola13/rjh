/**
 * Promise Deferred Constructor
 * 
 * Provides a way to create a Promise with externalized resolve/reject functions.
 * This pattern is useful when you need to control promise resolution from outside
 * the promise executor function.
 * 
 * @module PromiseConstructor
 */

/**
 * Deferred Promise object containing the promise instance and its control functions
 * 
 * @template T - The type of value the promise will resolve to
 */
export interface DeferredPromise<T = any> {
  /**
   * The promise instance that can be awaited or chained
   */
  promise: Promise<T>;
  
  /**
   * Function to resolve the promise with a value
   * 
   * @param value - The value to resolve the promise with
   */
  resolve: (value: T | PromiseLike<T>) => void;
  
  /**
   * Function to reject the promise with a reason
   * 
   * @param reason - The rejection reason (typically an Error)
   */
  reject: (reason?: any) => void;
}

/**
 * Promise constructor factory interface
 */
export interface PromiseConstructorFactory {
  /**
   * Creates a new deferred promise with externalized resolve/reject functions
   * 
   * @template T - The type of value the promise will resolve to
   * @param promiseConstructor - The Promise constructor to use (typically the global Promise)
   * @returns A deferred promise object with promise, resolve, and reject properties
   * 
   * @throws {TypeError} If the promise executor is called multiple times
   * 
   * @example
   *