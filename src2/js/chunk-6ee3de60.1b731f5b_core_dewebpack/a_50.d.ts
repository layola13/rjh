/**
 * Asynchronous Scheduler Module
 * Provides immediate scheduling capabilities for asynchronous operations
 */

/**
 * Asynchronous Action class that extends the base Action
 * Handles immediate execution of scheduled tasks
 */
declare class AsapAction<T> extends Action<T> {
  /** The scheduler instance managing this action */
  scheduler: AsapScheduler;
  
  /** The work function to be executed */
  work: (this: SchedulerAction<T>, state?: T) => void;

  /**
   * Creates a new AsapAction
   * @param scheduler - The scheduler instance
   * @param work - The work function to execute
   */
  constructor(scheduler: AsapScheduler, work: (this: SchedulerAction<T>, state?: T) => void);

  /**
   * Schedules the action to execute
   * @param state - Optional state to pass to the work function
   * @param delay - Delay in milliseconds before execution (default: 0)
   * @returns This action instance for chaining
   */
  schedule(state?: T, delay?: number): this;

  /**
   * Executes the action
   * @param state - The state to pass to the work function
   * @param delay - Delay in milliseconds
   * @returns The result of execution or subscription
   */
  execute(state: T, delay: number): void | Subscription;

  /**
   * Requests an async ID for scheduling
   * @param scheduler - The scheduler instance
   * @param id - Optional existing async ID
   * @param delay - Delay in milliseconds (default: 0)
   * @returns The async ID for this scheduled action
   */
  requestAsyncId(scheduler: AsapScheduler, id?: number | null, delay?: number): number | null;

  /**
   * Internal execution method
   * @param state - The state to pass to the work function
   * @param delay - Delay in milliseconds
   * @returns The result of execution
   */
  protected _execute(state: T, delay: number): void | Subscription;
}

/**
 * Asynchronous Scheduler class
 * Schedules tasks to run asynchronously as soon as possible
 */
declare class AsapScheduler extends AsyncScheduler {
  /**
   * Flushes all pending actions in the scheduler queue
   * @param action - The action to flush
   * @returns The flush result
   */
  flush(action?: AsapAction<unknown>): void | number;
}

/**
 * Singleton instance of the AsapScheduler
 * Used for scheduling tasks that need to execute asynchronously but immediately
 * @example
 *