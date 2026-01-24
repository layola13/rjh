/**
 * Converts a value to a Promise of a specific constructor type.
 * If the value is already a promise with the same constructor, returns it directly.
 * Otherwise, creates a new promise using the provided constructor and resolves it with the value.
 *
 * @template T - The type of the resolved promise value
 * @param promiseConstructor - The Promise constructor to use for creating the promise
 * @param value - The value to convert to a promise or wrap in a promise
 * @returns A promise that resolves to the provided value
 */
export default function promiseResolve<T = unknown>(
  promiseConstructor: PromiseConstructor,
  value: T | PromiseLike<T>
): Promise<T>;

/**
 * Checks if a value is an object (non-null object or function)
 * @internal
 */
declare function isObject(value: unknown): value is object;

/**
 * Checks if a value is callable (a function)
 * @internal
 */
declare function isCallable(value: unknown): value is Function;

/**
 * Gets the promise capability (resolve/reject/promise triple) for a constructor
 * @internal
 */
declare function getPromiseCapability(
  constructor: PromiseConstructor
): {
  promise: Promise<unknown>;
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
};