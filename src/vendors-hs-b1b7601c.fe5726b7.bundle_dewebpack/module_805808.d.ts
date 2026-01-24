/**
 * Provides an abstraction layer for setImmediate/clearImmediate operations.
 * Allows delegation to custom implementations while falling back to native APIs.
 * @module immediateProvider
 */

/**
 * Handle returned by setImmediate, used to cancel scheduled callbacks.
 */
export type ImmediateHandle = ReturnType<typeof setImmediate>;

/**
 * Delegate interface for custom setImmediate/clearImmediate implementations.
 * If provided, these methods will be used instead of the default ones.
 */
export interface ImmediateDelegate {
  /**
   * Schedule a callback to be executed asynchronously.
   * @param args - Callback function and optional arguments to pass to it
   * @returns Handle that can be used to cancel the scheduled callback
   */
  setImmediate(...args: unknown[]): ImmediateHandle;

  /**
   * Cancel a previously scheduled immediate callback.
   * @param handle - The handle returned by setImmediate
   */
  clearImmediate(handle: ImmediateHandle): void;
}

/**
 * Provider object that manages setImmediate/clearImmediate operations.
 * Supports delegation to allow custom implementations.
 */
export interface ImmediateProvider {
  /**
   * Schedule a callback to be executed asynchronously.
   * Uses delegate implementation if available, otherwise falls back to native setImmediate.
   * @param args - Callback function and optional arguments to pass to it
   * @returns Handle that can be used to cancel the scheduled callback
   */
  setImmediate(...args: unknown[]): ImmediateHandle;

  /**
   * Cancel a previously scheduled immediate callback.
   * Uses delegate implementation if available, otherwise falls back to native clearImmediate.
   * @param handle - The handle returned by setImmediate
   */
  clearImmediate(handle: ImmediateHandle): void;

  /**
   * Optional delegate for custom setImmediate/clearImmediate implementations.
   * When set, all operations will be routed through this delegate.
   */
  delegate: ImmediateDelegate | undefined;
}

/**
 * Global immediate provider instance.
 * Provides setImmediate/clearImmediate with optional delegation support.
 */
export declare const immediateProvider: ImmediateProvider;