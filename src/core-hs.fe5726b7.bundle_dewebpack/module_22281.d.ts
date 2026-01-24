/**
 * Converts a value to a Promise of a specific constructor type.
 * If the value is already an instance of the target constructor, returns it directly.
 * Otherwise, creates a new promise using the constructor's capability and resolves it with the value.
 * 
 * @template T - The type of the promise result
 * @param constructor - The promise constructor to use for creating the promise
 * @param value - The value to convert to a promise
 * @returns A promise that resolves to the given value
 */
declare function promiseResolve<T = unknown>(
  constructor: PromiseConstructor | PromiseConstructorLike,
  value: T | PromiseLike<T>
): Promise<T>;

/**
 * Interface representing a promise constructor-like object.
 */
interface PromiseConstructorLike {
  new <T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: unknown) => void) => void): PromiseLike<T>;
  readonly prototype: PromiseLike<unknown>;
}

/**
 * Represents the capability object returned by a promise capability resolver.
 * Contains the promise instance and its resolve/reject functions.
 * 
 * @template T - The type of value the promise resolves to
 */
interface PromiseCapability<T = unknown> {
  /** The promise instance */
  promise: Promise<T>;
  /** Function to resolve the promise */
  resolve: (value: T | PromiseLike<T>) => void;
  /** Function to reject the promise */
  reject: (reason?: unknown) => void;
}

export = promiseResolve;