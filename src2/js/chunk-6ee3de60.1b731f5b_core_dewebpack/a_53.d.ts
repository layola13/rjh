/**
 * ASAP (As Soon As Possible) Scheduler Module
 * Schedules tasks to be executed asynchronously as soon as possible using Promise microtasks
 */

/**
 * Represents an action that can be scheduled for asynchronous execution
 */
export interface IAsyncAction<T = unknown> {
  /**
   * State data passed to the action
   */
  state?: T;
  
  /**
   * Delay in milliseconds before executing the action
   */
  delay?: number;
  
  /**
   * Execute the action with given state and delay
   * @param state - The state data
   * @param delay - The delay duration
   * @returns Error if execution failed, void otherwise
   */
  execute(state?: T, delay?: number): Error | void;
  
  /**
   * Unsubscribe and cancel the action
   */
  unsubscribe(): void;
}

/**
 * ASAP Action class for immediate asynchronous scheduling
 * Extends base AsyncAction with ASAP-specific behavior
 * @template T - Type of state data
 */
export declare class AsapAction<T = unknown> {
  /**
   * The scheduler instance that manages this action
   */
  scheduler: AsapScheduler;
  
  /**
   * The work function to be executed
   */
  work: (state?: T) => void;
  
  /**
   * Creates a new ASAP action
   * @param scheduler - The scheduler managing this action
   * @param work - The work function to execute
   */
  constructor(scheduler: AsapScheduler, work: (state?: T) => void);
  
  /**
   * Request an async ID for scheduling this action
   * @param scheduler - The scheduler instance
   * @param id - Optional existing async ID
   * @param delay - Delay in milliseconds (default: 0)
   * @returns The async ID for this scheduled action
   */
  requestAsyncId(
    scheduler: AsapScheduler,
    id?: number,
    delay?: number
  ): number;
  
  /**
   * Recycle or clear an async ID when action completes
   * @param scheduler - The scheduler instance
   * @param id - The async ID to recycle
   * @param delay - Delay in milliseconds (default: 0)
   * @returns The recycled ID or undefined
   */
  recycleAsyncId(
    scheduler: AsapScheduler,
    id?: number,
    delay?: number
  ): number | undefined;
}

/**
 * ASAP Scheduler class for managing immediate asynchronous task execution
 * Uses Promise microtasks for scheduling
 */
export declare class AsapScheduler {
  /**
   * Queue of actions waiting to be executed
   */
  actions: IAsyncAction[];
  
  /**
   * Whether the scheduler is currently executing actions
   */
  active: boolean;
  
  /**
   * The scheduled flush operation ID (undefined if not scheduled)
   */
  scheduled?: number;
  
  /**
   * Creates a new ASAP scheduler instance
   */
  constructor();
  
  /**
   * Flush and execute all queued actions
   * @param action - Optional specific action to start with
   * @throws Error if any action execution fails
   */
  flush(action?: IAsyncAction): void;
}

/**
 * The singleton ASAP scheduler instance
 * Schedules tasks to execute asynchronously as soon as possible using microtasks
 * 
 * @example
 *