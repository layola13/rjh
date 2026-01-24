/**
 * Promise capability record factory
 * Creates a new promise capability with exposed resolve/reject functions
 * @module PromiseCapability
 */

import type { AFunction } from './d8e8';

/**
 * Executor function for Promise constructor
 * @template T - The type of value the promise resolves to
 */
type PromiseExecutor<T> = (
  resolve: (value: T | PromiseLike<T>) => void,
  reject: (reason?: unknown) => void
) => void;

/**
 * Promise constructor interface
 * @template T - The type of value the promise resolves to
 */
interface PromiseConstructor<T = unknown> {
  new (executor: PromiseExecutor<T>): Promise<T>;
}

/**
 * Promise capability record
 * Exposes resolve and reject functions outside the promise executor
 * @template T - The type of value the promise resolves to
 */
interface PromiseCapability<T = unknown> {
  /** The promise instance */
  readonly promise: Promise<T>;
  
  /** Function to resolve the promise */
  readonly resolve: (value: T | PromiseLike<T>) => void;
  
  /** Function to reject the promise */
  readonly reject: (reason?: unknown) => void;
}

/**
 * Factory function to create a new promise capability
 * @template T - The type of value the promise resolves to
 * @param promiseConstructor - The Promise constructor to use
 * @returns A new promise capability record
 */
export function f<T = unknown>(
  promiseConstructor: PromiseConstructor<T>
): PromiseCapability<T>;