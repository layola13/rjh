/**
 * Promise.race polyfill module
 * 
 * Provides a polyfill implementation for Promise.race that accepts an iterable
 * of promises and returns a promise that resolves or rejects as soon as one of
 * the input promises resolves or rejects.
 */

/**
 * Promise constructor interface with race method
 */
interface PromiseConstructor {
  /**
   * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved or rejected.
   * 
   * @template T - The type of the promise values
   * @param values - An iterable of Promises or values
   * @returns A new Promise that settles with the eventual state of the first promise that settles
   * 
   * @example
   *