/**
 * Promise.all polyfill/implementation
 * 
 * Provides a static method for Promise that waits for all promises in an iterable to resolve.
 * If any promise rejects, the returned promise immediately rejects with that reason.
 */

/**
 * Represents a promise-like object that can be resolved or rejected
 */
interface PromiseCapability<T> {
  /** The promise instance */
  promise: Promise<T>;
  /** Function to resolve the promise */
  resolve: (value: T | PromiseLike<T>) => void;
  /** Function to reject the promise */
  reject: (reason?: unknown) => void;
}

/**
 * Factory for creating promise capabilities
 */
interface PromiseCapabilityFactory {
  f<T>(constructor: PromiseConstructor): PromiseCapability<T>;
}

/**
 * Result of a safe execution wrapper
 */
interface SafeExecutionResult<T> {
  /** Whether an error occurred during execution */
  error: boolean;
  /** The error value if error is true, otherwise the return value */
  value: T;
}

/**
 * Promise.all static method type definition
 * 
 * @template T - The type of values in the input iterable
 * @param values - An iterable of values or promises to wait for
 * @returns A promise that resolves with an array of all resolved values,
 *          or rejects with the first rejection reason
 * 
 * @example
 *