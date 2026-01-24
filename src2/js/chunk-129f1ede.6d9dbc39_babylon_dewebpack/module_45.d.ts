/**
 * Async Action for RxJS Scheduler
 * Represents a unit of work to be executed asynchronously
 */

/**
 * State type for the action's work function
 */
type ActionState = any;

/**
 * Work function that will be executed by the action
 */
type WorkFunction<T> = (this: AsyncAction<T>, state?: T) => void;

/**
 * Base Action interface
 */
interface Action<T> {
  schedule(state?: T, delay?: number): this;
}

/**
 * Scheduler interface that manages actions
 */
interface Scheduler {
  actions: Action<any>[];
  flush(action: AsyncAction<any>): void;
}

/**
 * Base Action class
 * Provides basic scheduling functionality
 */
declare class BaseAction<T> implements Action<T> {
  constructor(scheduler: Scheduler, work: WorkFunction<T>);
  
  /**
   * Schedule the action to be executed
   * @param state - The state to pass to the work function
   * @param delay - Delay in milliseconds before execution (default: 0)
   * @returns The action instance for chaining
   */
  schedule(state?: T, delay?: number): this;
}

/**
 * Async Action class
 * Extends base action with asynchronous execution capabilities using setInterval
 */
declare class AsyncAction<T> extends BaseAction<T> {
  /** The scheduler managing this action */
  scheduler: Scheduler;
  
  /** The work function to execute */
  work: WorkFunction<T> | null;
  
  /** Current state passed to the work function */
  state?: T;
  
  /** Whether the action is pending execution */
  pending: boolean;
  
  /** Delay in milliseconds before execution */
  delay: number | null;
  
  /** Timer ID from setInterval */
  id: number | null;
  
  /** Whether the action has been closed/cancelled */
  closed: boolean;

  /**
   * Creates a new AsyncAction
   * @param scheduler - The scheduler that will execute this action
   * @param work - The work function to execute
   */
  constructor(scheduler: Scheduler, work: WorkFunction<T>);

  /**
   * Schedule the action for execution
   * @param state - The state to pass to the work function
   * @param delay - Delay in milliseconds (default: 0)
   * @returns The action instance, or this if already closed
   */
  schedule(state?: T, delay?: number): this;

  /**
   * Request an async ID (timer) from the scheduler
   * @param scheduler - The scheduler instance
   * @param id - Existing timer ID or null
   * @param delay - Delay in milliseconds (default: 0)
   * @returns The timer ID from setInterval
   */
  requestAsyncId(scheduler: Scheduler, id: number | null, delay?: number): number;

  /**
   * Recycle (clear) an existing async ID
   * @param scheduler - The scheduler instance
   * @param id - The timer ID to clear
   * @param delay - The delay value (default: 0)
   * @returns The ID if it can be reused, otherwise undefined
   */
  recycleAsyncId(scheduler: Scheduler, id: number | null, delay?: number): number | undefined;

  /**
   * Execute the scheduled work
   * @param state - The state to pass to the work function
   * @param delay - The delay value
   * @returns Error if execution failed, void otherwise
   */
  execute(state: T, delay: number): Error | void;

  /**
   * Internal execution method
   * @param state - The state to pass to the work function
   * @param delay - The delay value
   * @returns Error if execution failed, undefined otherwise
   */
  protected _execute(state: T, delay: number): Error | undefined;

  /**
   * Clean up resources when unsubscribing
   * @internal
   */
  protected _unsubscribe(): void;

  /**
   * Unsubscribe and cancel the action
   */
  unsubscribe(): void;
}

export { AsyncAction, BaseAction, Scheduler, WorkFunction, ActionState };
export default AsyncAction;