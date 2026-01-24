/**
 * Promise.all polyfill implementation
 * Executes multiple promises concurrently and returns a single promise that resolves
 * when all input promises have resolved, or rejects when any input promise rejects.
 * 
 * @template T - The type of values in the iterable
 * @param iterable - An iterable of promises or values to resolve
 * @returns A promise that resolves to an array of resolved values
 */
declare function promiseAll<T>(
  this: PromiseConstructor,
  iterable: Iterable<T | PromiseLike<T>>
): Promise<Awaited<T>[]>;

/**
 * Internal promise state tracker
 */
interface PromiseCapability<T> {
  /** The promise instance */
  promise: Promise<T>;
  /** Resolve function for the promise */
  resolve: (value: T | PromiseLike<T>) => void;
  /** Reject function for the promise */
  reject: (reason?: unknown) => void;
}

/**
 * Result wrapper for error handling
 */
interface ExecutionResult<T> {
  /** Indicates if an error occurred during execution */
  error: boolean;
  /** The return value or error value */
  value: T | unknown;
}

/**
 * Creates a new promise capability (deferred promise pattern)
 * @template T - The type of value the promise will resolve to
 * @param constructor - The promise constructor
 * @returns A promise capability object with promise, resolve, and reject
 */
declare function newPromiseCapability<T>(
  constructor: PromiseConstructor
): PromiseCapability<T>;

/**
 * Executes a function and catches any errors
 * @template T - The return type of the function
 * @param fn - The function to execute
 * @returns An execution result object containing error status and value
 */
declare function tryCatch<T>(fn: () => T): ExecutionResult<T>;

/**
 * Invokes a promise resolver with a given context and value
 * @template T - The type of the promise value
 * @param resolver - The promise resolver function
 * @param context - The context (this) to invoke the resolver with
 * @param value - The value to pass to the resolver
 * @returns A promise for the resolved value
 */
declare function invokeResolver<T>(
  resolver: (value: unknown) => T | PromiseLike<T>,
  context: unknown,
  value: unknown
): Promise<T>;

/**
 * Iterates over an iterable and executes a callback for each item
 * @template T - The type of items in the iterable
 * @param iterable - The iterable to iterate over
 * @param callback - The callback function to execute for each item
 */
declare function iterate<T>(
  iterable: Iterable<T>,
  callback: (item: T) => void
): void;

/**
 * Validates that a value is callable (a function)
 * @param value - The value to check
 * @throws {TypeError} If the value is not callable
 */
declare function assertCallable(value: unknown): asserts value is Function;