/**
 * Promise.all implementation
 * Resolves when all promises in the iterable resolve, or rejects when any promise rejects
 */
declare function promiseAll<T>(
  iterable: Iterable<T | PromiseLike<T>>
): Promise<Awaited<T>[]>;

/**
 * Internal Promise resolution structure
 */
interface PromiseCapability<T> {
  /** Resolve function for the promise */
  resolve: (value: T | PromiseLike<T>) => void;
  /** Reject function for the promise */
  reject: (reason?: unknown) => void;
  /** The underlying promise instance */
  promise: Promise<T>;
}

/**
 * Error result container from operation execution
 */
interface ExecutionResult<T = unknown> {
  /** Error flag - true if operation threw an error */
  e: boolean;
  /** Value - either the result or the error thrown */
  v: T;
}

/**
 * Creates a new Promise capability object
 * @returns Promise capability with resolve, reject, and promise properties
 */
declare function createPromiseCapability<T>(): PromiseCapability<T>;

/**
 * Executes a function and captures any thrown errors
 * @param fn - Function to execute
 * @returns Execution result with error flag and value
 */
declare function executeSafely<T>(fn: () => T): ExecutionResult<T>;

/**
 * Iterates over an iterable and calls callback for each element
 * @param iterable - The iterable to traverse
 * @param exitOnError - Whether to stop iteration on error
 * @param callback - Function called for each element
 */
declare function iterate<T>(
  iterable: Iterable<T>,
  exitOnError: boolean,
  callback: (value: T) => void
): void;