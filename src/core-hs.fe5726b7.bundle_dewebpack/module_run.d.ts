/**
 * Module: module_run
 * Original ID: run
 * 
 * Executes a task with the provided arguments and manages task lifecycle.
 * Sets the internal state to Running, invokes the task function, and completes the task.
 */

/**
 * Enumeration of possible task states
 */
declare enum TaskState {
  Idle = "Idle",
  Running = "Running",
  Completed = "Completed",
  Failed = "Failed"
}

/**
 * Generic task runner interface
 */
declare interface TaskRunner<TArgs extends any[] = any[], TResult = any> {
  /**
   * Internal state of the task runner
   * @private
   */
  _state: TaskState;

  /**
   * Executes a task with the provided arguments
   * @param args - Variable arguments passed to the task function
   * @returns The result returned by the task function
   */
  run(...args: TArgs): TResult;

  /**
   * Completes the task and performs cleanup
   * @param taskId - Identifier of the task to complete
   * @private
   */
  _completeTask(taskId: unknown): void;
}

/**
 * Type definition for the task execution function
 */
declare type TaskExecutor<TArgs extends any[] = any[], TResult = any> = (
  ...args: TArgs
) => TResult;