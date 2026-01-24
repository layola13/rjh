/**
 * Promise.race polyfill implementation
 * Provides a static method that returns a promise that fulfills or rejects
 * as soon as one of the promises in an iterable fulfills or rejects.
 */

interface PromiseConstructor {
  /**
   * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved or rejected.
   * @param values An iterable of Promises.
   * @returns A new Promise.
   */
  race<T>(values: Iterable<T | PromiseLike<T>>): Promise<Awaited<T>>;
}

/**
 * Internal deferred promise structure
 */
interface DeferredPromise<T> {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: unknown) => void;
}

/**
 * Error capture result from safe execution
 */
interface ExecutionResult<T> {
  error: boolean;
  value?: T;
}

/**
 * Creates a deferred promise with external resolve/reject handlers
 */
declare function createDeferred<T>(constructor: PromiseConstructor): DeferredPromise<T>;

/**
 * Ensures a value is callable
 */
declare function assertCallable<T extends Function>(fn: T): T;

/**
 * Safely executes a function and captures any errors
 */
declare function tryCatch<T>(fn: () => T): ExecutionResult<T>;

/**
 * Iterates over an iterable and invokes a callback for each element
 */
declare function iterate<T>(
  iterable: Iterable<T>,
  callback: (value: T) => void
): void;

/**
 * Polyfill for Promise.race
 * @param values An iterable of promises or values
 * @returns A promise that settles with the first settled promise from the iterable
 */
declare function promiseRace<T>(
  this: PromiseConstructor,
  values: Iterable<T | PromiseLike<T>>
): Promise<Awaited<T>>;