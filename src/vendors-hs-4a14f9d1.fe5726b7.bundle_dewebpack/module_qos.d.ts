/**
 * Timer management module providing cross-environment timeout and interval utilities.
 * Compatible with Node.js timer API, including enroll/unenroll for connection pooling.
 * @module Qos
 */

/**
 * Internal timer handle wrapper.
 * Provides a consistent interface for timer management across environments.
 */
declare class TimerHandle {
  /** Internal timer ID returned by setTimeout/setInterval */
  private readonly _id: number;
  
  /** Clear function (clearTimeout or clearInterval) */
  private readonly _clearFn: (id: number) => void;

  /**
   * Creates a new timer handle.
   * @param id - The timer ID from setTimeout/setInterval
   * @param clearFn - The corresponding clear function
   */
  constructor(id: number, clearFn: (id: number) => void);

  /**
   * Node.js compatibility: Mark timer as unreferenced (no-op in browser).
   * Prevents the timer from keeping the event loop alive.
   */
  unref(): void;

  /**
   * Node.js compatibility: Mark timer as referenced (no-op in browser).
   * Allows the timer to keep the event loop alive.
   */
  ref(): void;

  /**
   * Cancels the timer by calling the appropriate clear function.
   */
  close(): void;
}

/**
 * Object with idle timeout tracking properties.
 * Used by enroll/unenroll/active functions for connection pooling.
 */
export interface IdleTimeoutTarget {
  /** Internal timeout ID for the idle timer */
  _idleTimeoutId?: number;
  
  /** Idle timeout duration in milliseconds */
  _idleTimeout?: number;
  
  /** Optional callback invoked when idle timeout expires */
  _onTimeout?(): void;
}

/**
 * Creates a timeout that executes a function after a specified delay.
 * @param callback - Function to execute after delay
 * @param delay - Delay in milliseconds
 * @param args - Additional arguments passed to callback
 * @returns Timer handle with close() method
 */
export function setTimeout(
  callback: (...args: any[]) => void,
  delay?: number,
  ...args: any[]
): TimerHandle;

/**
 * Creates an interval that repeatedly executes a function.
 * @param callback - Function to execute on each interval
 * @param delay - Interval duration in milliseconds
 * @param args - Additional arguments passed to callback
 * @returns Timer handle with close() method
 */
export function setInterval(
  callback: (...args: any[]) => void,
  delay?: number,
  ...args: any[]
): TimerHandle;

/**
 * Cancels a timeout created by setTimeout.
 * @param handle - Timer handle returned by setTimeout
 */
export function clearTimeout(handle?: TimerHandle | null): void;

/**
 * Cancels an interval created by setInterval.
 * @param handle - Timer handle returned by setInterval
 */
export function clearInterval(handle?: TimerHandle | null): void;

/**
 * Enrolls an object for idle timeout tracking.
 * Used in connection pooling to track idle connections.
 * @param target - Object to track for idle timeout
 * @param delay - Idle timeout duration in milliseconds
 */
export function enroll(target: IdleTimeoutTarget, delay: number): void;

/**
 * Removes idle timeout tracking from an object.
 * @param target - Object to stop tracking
 */
export function unenroll(target: IdleTimeoutTarget): void;

/**
 * Resets and activates the idle timeout for an object.
 * Should be called when the object is used to defer timeout.
 * @param target - Object with idle timeout to reset
 */
export function active(target: IdleTimeoutTarget): void;

/**
 * Alias for active() - resets idle timeout without referencing event loop.
 * @param target - Object with idle timeout to reset
 */
export function _unrefActive(target: IdleTimeoutTarget): void;

/**
 * Executes a function asynchronously as soon as possible.
 * @param callback - Function to execute
 * @param args - Arguments passed to callback
 * @returns Timer handle (environment-specific)
 */
export const setImmediate: typeof globalThis.setImmediate;

/**
 * Cancels an immediate execution created by setImmediate.
 * @param handle - Handle returned by setImmediate
 */
export const clearImmediate: typeof globalThis.clearImmediate;