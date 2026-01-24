/**
 * Promise capability record that exposes resolve and reject functions
 * externally from a Promise constructor.
 * 
 * This module provides a mechanism to create a Promise along with its
 * resolve and reject functions accessible outside the executor scope.
 */

/**
 * Represents a Promise capability with exposed resolution controls.
 * 
 * @template T - The type of value the Promise will resolve to
 */
export interface PromiseCapability<T = unknown> {
  /** The Promise instance */
  promise: Promise<T>;
  
  /** Function to resolve the Promise with a value */
  resolve: (value: T | PromiseLike<T>) => void;
  
  /** Function to reject the Promise with a reason */
  reject: (reason?: unknown) => void;
}

/**
 * Factory function to create a new PromiseCapability.
 * 
 * @template T - The type of value the Promise will resolve to
 * @param promiseConstructor - The Promise constructor to use (typically the native Promise)
 * @returns A PromiseCapability object containing the promise and its resolve/reject functions
 * 
 * @throws {TypeError} If the Promise executor is called multiple times (Bad Promise constructor)
 * 
 * @example
 *