/**
 * Async action scheduler for managing deferred task execution.
 * This module provides action scheduling capabilities with support for
 * delays, cancellation, and state management.
 */

/**
 * Represents the state that can be passed to scheduled actions
 */
export type ActionState<T = unknown> = T;

/**
 * Work function that will be executed by the action
 * @template T - The type of state passed to the work function
 */
export type WorkFunction<T> = (this: AsyncAction<T>, state?: T) => void;

/**
 * Scheduler interface for managing async actions
 */
export interface IScheduler {
  /**
   * Flush pending actions
   * @param action - The action to flush
   */
  flush(action: AsyncAction<unknown>): void;
  
  /**
   * Collection of scheduled actions
   */
  actions: AsyncAction<unknown>[];
}

/**
 * Base action class that can be scheduled
 * @template T - The type of state managed by this action
 */
export declare class Action<T = unknown> {
  /**
   * Creates a new Action instance
   * @param scheduler - The scheduler managing this action
   * @param work - The work function to execute
   */
  constructor(scheduler: IScheduler, work: WorkFunction<T>);
  
  /**
   * Schedule this action for execution
   * @param state - Optional state to pass to the work function
   * @param delay - Delay in milliseconds before execution (default: 0)
   * @returns This action instance for chaining
   */
  schedule(state?: T, delay?: number): this;
}

/**
 * Async action that supports delayed execution and lifecycle management
 * @template T - The type of state managed by this action
 */
export declare class AsyncAction<T = unknown> extends Action<T> {
  /**
   * The scheduler managing this action
   */
  scheduler: IScheduler;
  
  /**
   * The work function to be executed
   */
  work: WorkFunction<T> | null;
  
  /**
   * Whether this action is pending execution
   */
  pending: boolean;
  
  /**
   * The current state of this action
   */
  state?: T;
  
  /**
   * Timer ID for scheduled execution
   */
  id?: number | null;
  
  /**
   * Delay in milliseconds before execution
   */
  delay: number | null;
  
  /**
   * Whether this action has been closed/cancelled
   */
  closed: boolean;
  
  /**
   * Creates a new AsyncAction instance
   * @param scheduler - The scheduler managing this action
   * @param work - The work function to execute
   */
  constructor(scheduler: IScheduler, work: WorkFunction<T>);
  
  /**
   * Schedule this action for execution with optional delay
   * @param state - State to pass to the work function
   * @param delay - Delay in milliseconds before execution (default: 0)
   * @returns This action instance for chaining, or this if already closed
   */
  schedule(state?: T, delay?: number): this;
  
  /**
   * Request an async ID for scheduling
   * @param scheduler - The scheduler to use
   * @param id - Existing ID to reuse (optional)
   * @param delay - Delay in milliseconds (default: 0)
   * @returns The scheduled timer ID
   */
  requestAsyncId(scheduler: IScheduler, id?: number | null, delay?: number): number;
  
  /**
   * Recycle an existing async ID or clear it if no longer needed
   * @param scheduler - The scheduler managing the ID
   * @param id - The ID to recycle
   * @param delay - The delay for comparison (optional)
   * @returns The ID if recycled, undefined otherwise
   */
  recycleAsyncId(scheduler: IScheduler, id: number, delay?: number | null): number | undefined;
  
  /**
   * Execute the scheduled work function
   * @param state - State to pass to the work function
   * @param delay - The delay that was used for scheduling
   * @returns Error if execution failed, void otherwise
   */
  execute(state: T, delay: number): Error | void;
  
  /**
   * Internal execution method that calls the work function
   * @param state - State to pass to the work function
   * @param delay - The delay that was used for scheduling
   * @returns Error if execution failed, void otherwise
   * @protected
   */
  _execute(state: T, delay: number): Error | void;
  
  /**
   * Cleanup method called when unsubscribing
   * @protected
   */
  _unsubscribe(): void;
  
  /**
   * Unsubscribe and cancel this action
   */
  unsubscribe(): void;
}

/**
 * Export the AsyncAction as the default export 'a'
 */
export { AsyncAction as a };