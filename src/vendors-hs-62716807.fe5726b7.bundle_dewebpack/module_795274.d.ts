/**
 * Scheduler module for managing deferred task execution
 * Provides cross-platform setImmediate/clearImmediate implementation
 */

/**
 * Task identifier type
 */
type TaskId = number;

/**
 * Callback function type for scheduled tasks
 */
type TaskCallback = (...args: any[]) => void;

/**
 * Scheduler interface for managing asynchronous task execution
 */
interface Scheduler {
  /**
   * Schedule a callback to be executed asynchronously as soon as possible
   * @param callback - The function to execute
   * @param args - Optional arguments to pass to the callback
   * @returns Task identifier that can be used to cancel the task
   */
  set(callback: TaskCallback, ...args: any[]): TaskId;

  /**
   * Cancel a previously scheduled task
   * @param taskId - The identifier returned by set()
   */
  clear(taskId: TaskId): void;
}

/**
 * Export the scheduler with setImmediate/clearImmediate functionality
 */
declare const scheduler: Scheduler;

export = scheduler;