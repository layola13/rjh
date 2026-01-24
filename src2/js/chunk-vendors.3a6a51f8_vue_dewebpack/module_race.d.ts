/**
 * Promise.race implementation
 * Resolves or rejects as soon as one of the promises in the iterable resolves or rejects
 * @template T The type of the promise resolution value
 */
declare function race<T>(
  iterable: Iterable<T | PromiseLike<T>>
): Promise<Awaited<T>>;

/**
 * Internal capability record for promise construction
 * @template T The promise resolution type
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
 * Result wrapper for operations that may throw
 * @template T The result value type
 */
interface TryResult<T> {
  /** Error flag - true if an error occurred */
  e: boolean;
  /** Value - contains the result or error */
  v: T | Error;
}

/**
 * Creates a new promise capability
 * @template T The promise resolution type
 * @param constructor The promise constructor
 * @returns A capability record with promise, resolve, and reject
 */
declare function newPromiseCapability<T>(
  constructor: PromiseConstructor
): PromiseCapability<T>;

/**
 * Executes a function and catches any errors
 * @template T The return type of the function
 * @param fn The function to execute
 * @returns A result object indicating success or failure
 */
declare function tryCatch<T>(fn: () => T): TryResult<T>;

/**
 * Iterates over an iterable with a callback
 * @template T The element type
 * @param iterable The iterable to iterate over
 * @param stopOnError Whether to stop iteration on error
 * @param callback The callback function for each element
 */
declare function iterate<T>(
  iterable: Iterable<T>,
  stopOnError: boolean,
  callback: (element: T) => void
): void;