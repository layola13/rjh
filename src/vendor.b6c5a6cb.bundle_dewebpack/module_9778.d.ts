/**
 * Promise Polyfill Module
 * Provides a compliant Promise implementation for environments that lack native support.
 */

/**
 * Promise state enumeration
 */
type PromiseState = 'pending' | 'sealed' | 'fulfilled' | 'rejected';

/**
 * Internal promise handler structure
 */
interface PromiseHandler<T, TResult1, TResult2> {
  /** The promise instance that owns this handler */
  owner: PromisePolyfill<T>;
  /** The promise returned by .then() */
  then: PromisePolyfill<TResult1 | TResult2>;
  /** Callback for fulfilled state */
  fulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null;
  /** Callback for rejected state */
  rejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null;
}

/**
 * Promise executor function type
 */
type PromiseExecutor<T> = (
  resolve: (value: T | PromiseLike<T>) => void,
  reject: (reason?: any) => void
) => void;

/**
 * Polyfill implementation of ES6 Promise
 * @template T The type of the resolved value
 */
export declare class PromisePolyfill<T> {
  /**
   * Creates a new Promise
   * @param executor A callback used to initialize the promise
   * @throws {TypeError} If executor is not a function or constructor called without 'new'
   */
  constructor(executor: PromiseExecutor<T>);

  /**
   * Internal state of the promise
   * @internal
   */
  private state_: PromiseState;

  /**
   * Internal array of then handlers
   * @internal
   */
  private then_: Array<PromiseHandler<T, any, any>> | null;

  /**
   * Internal data (resolved value or rejection reason)
   * @internal
   */
  private data_: any;

  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise
   * @template TResult1 Type of the fulfilled callback result
   * @template TResult2 Type of the rejected callback result
   * @param onfulfilled Callback invoked when the Promise is resolved
   * @param onrejected Callback invoked when the Promise is rejected
   * @returns A Promise for the completion of which ever callback is executed
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
  ): PromisePolyfill<TResult1 | TResult2>;

  /**
   * Attaches a callback for only the rejection of the Promise
   * @template TResult Type of the callback result
   * @param onrejected Callback invoked when the Promise is rejected
   * @returns A Promise for the completion of the callback
   */
  catch<TResult = never>(
    onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null
  ): PromisePolyfill<T | TResult>;

  /**
   * Creates a Promise that is resolved with an array of results when all promises resolve
   * @template T Type of the values in the input array
   * @param values An array of Promises or values
   * @returns A new Promise that resolves to an array of results
   * @throws {TypeError} If values is not an array
   */
  static all<T>(values: readonly (T | PromiseLike<T>)[]): PromisePolyfill<T[]>;

  /**
   * Creates a Promise that resolves or rejects as soon as one of the promises resolves or rejects
   * @template T Type of the values in the input array
   * @param values An array of Promises or values
   * @returns A new Promise that resolves or rejects with the first settled promise
   * @throws {TypeError} If values is not an array
   */
  static race<T>(values: readonly (T | PromiseLike<T>)[]): PromisePolyfill<T>;

  /**
   * Creates a Promise that is resolved with the given value
   * @template T Type of the value
   * @param value Value to resolve or a Promise
   * @returns A resolved Promise
   */
  static resolve<T>(value: T | PromiseLike<T>): PromisePolyfill<T>;

  /**
   * Creates a Promise that is rejected with the given reason
   * @template T Type parameter (for compatibility)
   * @param reason The rejection reason
   * @returns A rejected Promise
   */
  static reject<T = never>(reason?: any): PromisePolyfill<T>;
}

/**
 * Module exports
 */
export declare const Promise: typeof PromisePolyfill;
export declare const Polyfill: typeof PromisePolyfill;

export default PromisePolyfill;