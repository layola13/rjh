/**
 * Timer management module providing cross-environment timer utilities.
 * Implements Node.js-compatible timer functions for browser and Node environments.
 * @module Qos
 */

/**
 * Timer handle interface representing an active timer.
 * Provides methods to manage the lifecycle of setTimeout/setInterval timers.
 */
export interface TimerHandle {
  /**
   * Internal timer ID returned by native setTimeout/setInterval
   * @internal
   */
  _id: number | NodeJS.Timeout;

  /**
   * Function to clear this timer (clearTimeout or clearInterval)
   * @internal
   */
  _clearFn: (id: number | NodeJS.Timeout) => void;

  /**
   * Prevents the timer from keeping the event loop alive (Node.js compatibility).
   * No-op in browser environments.
   */
  unref(): void;

  /**
   * Allows the timer to keep the event loop alive (Node.js compatibility).
   * No-op in browser environments.
   */
  ref(): void;

  /**
   * Cancels the timer, preventing the callback from executing.
   */
  close(): void;
}

/**
 * Object with idle timeout tracking capabilities.
 */
export interface IdleTimeoutObject {
  /**
   * Internal timer ID for the idle timeout
   * @internal
   */
  _idleTimeoutId?: number | NodeJS.Timeout;

  /**
   * Idle timeout duration in milliseconds
   * @internal
   */
  _idleTimeout?: number;

  /**
   * Callback invoked when the idle timeout expires
   * @internal
   */
  _onTimeout?: () => void;
}

/**
 * Creates a timeout that executes a callback after the specified delay.
 * @param callback - Function to execute after the delay
 * @param delay - Delay in milliseconds before executing the callback
 * @param args - Additional arguments to pass to the callback
 * @returns Timer handle that can be used to cancel or manage the timeout
 */
export function setTimeout(
  callback: (...args: unknown[]) => void,
  delay?: number,
  ...args: unknown[]
): TimerHandle;

/**
 * Creates an interval that repeatedly executes a callback at the specified interval.
 * @param callback - Function to execute at each interval
 * @param interval - Time in milliseconds between each execution
 * @param args - Additional arguments to pass to the callback
 * @returns Timer handle that can be used to cancel or manage the interval
 */
export function setInterval(
  callback: (...args: unknown[]) => void,
  interval?: number,
  ...args: unknown[]
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
 * Sets up the object with an idle timeout duration without starting the timer.
 * @param item - Object to enroll for idle timeout tracking
 * @param delay - Idle timeout duration in milliseconds
 */
export function enroll(item: IdleTimeoutObject, delay: number): void;

/**
 * Unenrolls an object from idle timeout tracking.
 * Clears any active idle timeout and resets the timeout duration.
 * @param item - Object to unenroll from idle timeout tracking
 */
export function unenroll(item: IdleTimeoutObject): void;

/**
 * Activates or reactivates the idle timeout for an object.
 * Resets the timer to call the object's _onTimeout callback after _idleTimeout milliseconds.
 * @param item - Object with idle timeout tracking
 */
export function active(item: IdleTimeoutObject): void;

/**
 * Alias for active(). Activates the idle timeout without preventing event loop exit.
 * @param item - Object with idle timeout tracking
 */
export function _unrefActive(item: IdleTimeoutObject): void;

/**
 * Schedules a callback to execute immediately after I/O events callbacks.
 * @param callback - Function to execute
 * @param args - Arguments to pass to the callback
 * @returns Timer handle or immediate ID
 */
export const setImmediate: (
  callback: (...args: unknown[]) => void,
  ...args: unknown[]
) => number | NodeJS.Immediate | undefined;

/**
 * Cancels an immediate created by setImmediate.
 * @param handle - Handle returned by setImmediate
 */
export const clearImmediate: (handle?: number | NodeJS.Immediate) => void;