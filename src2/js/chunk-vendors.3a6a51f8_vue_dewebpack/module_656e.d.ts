/**
 * Promise capability record factory
 * Creates a deferred-like object with externalized resolve/reject controls
 * @module PromiseCapability
 */

/**
 * Represents a Promise with externalized resolve and reject functions
 * @template T - The type of value the promise will resolve to
 */
export interface PromiseCapability<T = unknown> {
  /** The underlying Promise instance */
  promise: Promise<T>;
  /** Function to resolve the promise with a value */
  resolve: (value: T | PromiseLike<T>) => void;
  /** Function to reject the promise with a reason */
  reject: (reason?: unknown) => void;
}

/**
 * Validates that a value is callable (function)
 * @param fn - The value to validate
 * @returns The validated function
 * @throws {TypeError} If the value is not a function
 */
declare function aCallable(fn: unknown): Function;

/**
 * Creates a new PromiseCapability record for the given Promise constructor
 * @template T - The type of value the promise will resolve to
 * @param promiseConstructor - The Promise constructor to use
 * @returns A PromiseCapability object with promise, resolve, and reject
 * @throws {TypeError} If resolve or reject are already defined (Bad Promise constructor)
 */
export function f<T = unknown>(
  promiseConstructor: PromiseConstructor
): PromiseCapability<T>;