/**
 * Result type when the operation completes before timeout
 */
export interface TimeoutSuccessResult<T> {
  /** Indicates whether the operation timed out */
  timeout: false;
  /** The data returned by the promise */
  data: T;
}

/**
 * Result type when the operation exceeds the timeout limit
 */
export interface TimeoutFailureResult {
  /** Indicates whether the operation timed out */
  timeout: true;
}

/**
 * Union type representing either a successful or timed out result
 */
export type TimeoutResult<T> = TimeoutSuccessResult<T> | TimeoutFailureResult;

/**
 * Wraps a promise-returning function with a timeout mechanism.
 * 
 * @template T - The type of data returned by the promise function
 * @param promiseFactory - A function that returns a Promise to be executed
 * @param timeoutMs - Timeout duration in milliseconds (default: 10000ms/10s)
 * @returns A promise that resolves with either the data or a timeout indicator
 * 
 * @remarks
 * - If the promise resolves before timeout, returns `{ timeout: false, data: T }`
 * - If timeout occurs first, returns `{ timeout: true }`
 * - Uses `window.saveTimeout` if available, otherwise falls back to `timeoutMs`
 * - The promise rejection from the factory will propagate to the caller
 * 
 * @example
 *