/**
 * Asynchronous Action Scheduler Module
 * Provides custom action scheduling with immediate execution support
 */

/**
 * Base interface for schedulable work
 * @template T - Type of state passed to the work function
 */
interface SchedulerWork<T = unknown> {
  (this: SchedulerAction<T>, state?: T): void;
}

/**
 * Base scheduler action interface
 * @template T - Type of state managed by the action
 */
interface SchedulerAction<T = unknown> {
  /** Current state of the action */
  state?: T;
  /** Delay in milliseconds before execution */
  delay: number;
  /** Whether the action has been closed/cancelled */
  closed: boolean;
  /** The scheduler managing this action */
  scheduler: Scheduler;
  /** Work function to be executed */
  work: SchedulerWork<T>;
  
  /**
   * Schedule the work to be executed
   * @param state - State to pass to the work function
   * @param delay - Optional delay in milliseconds (defaults to 0)
   * @returns This action instance for chaining
   */
  schedule(state?: T, delay?: number): this;
  
  /**
   * Execute the scheduled work
   * @param state - State to pass to the work function
   * @param delay - Delay in milliseconds
   * @returns Subscription or void
   */
  execute(state: T, delay: number): void;
  
  /**
   * Request an async ID from the scheduler
   * @param scheduler - The scheduler to request from
   * @param id - Optional existing ID
   * @param delay - Optional delay in milliseconds (defaults to 0)
   * @returns Async ID (typically a timer handle)
   */
  requestAsyncId(scheduler: Scheduler, id?: unknown, delay?: number): unknown;
}

/**
 * Base scheduler interface for managing action execution
 */
interface Scheduler {
  /**
   * Flush all pending actions immediately
   * @param action - Optional action to flush
   */
  flush(action?: SchedulerAction): void;
}

/**
 * Custom async action that supports immediate (synchronous) execution
 * when delay is 0 or less
 * @template T - Type of state managed by the action
 */
declare class AsynchronousAction<T = unknown> implements SchedulerAction<T> {
  state?: T;
  delay: number;
  closed: boolean;
  scheduler: Scheduler;
  work: SchedulerWork<T>;
  
  /**
   * Create a new asynchronous action
   * @param scheduler - The scheduler managing this action
   * @param work - The work function to execute
   */
  constructor(scheduler: Scheduler, work: SchedulerWork<T>);
  
  /**
   * Schedule work with immediate execution support
   * If delay > 0, delegates to parent scheduler
   * If delay <= 0, flushes immediately via scheduler.flush()
   * @param state - State to pass to work function
   * @param delay - Delay in milliseconds (defaults to 0)
   * @returns This action for chaining
   */
  schedule(state?: T, delay?: number): this;
  
  /**
   * Execute the work
   * If delay > 0 or action is closed, delegates to parent
   * Otherwise executes immediately via _execute()
   * @param state - State to pass to work function  
   * @param delay - Delay in milliseconds
   */
  execute(state: T, delay: number): void;
  
  /**
   * Request async ID with immediate execution optimization
   * If delay is positive or undefined with positive this.delay, requests async ID
   * Otherwise triggers immediate flush via scheduler.flush()
   * @param scheduler - The scheduler to request from
   * @param id - Optional existing async ID
   * @param delay - Optional delay in milliseconds (defaults to 0)
   * @returns Async ID or result of flush operation
   */
  requestAsyncId(scheduler: Scheduler, id?: unknown, delay?: number): unknown;
  
  /**
   * Internal method to execute work (implementation-specific)
   * @internal
   * @param state - State to pass to work function
   * @param delay - Delay in milliseconds
   */
  protected _execute(state: T, delay: number): void;
}

/**
 * Scheduler class that manages asynchronous actions
 * @template T - Type of action work function
 */
declare class AsynchronousScheduler<T extends SchedulerWork = SchedulerWork> {
  /**
   * Create a new asynchronous scheduler
   * @param actionType - Constructor for actions managed by this scheduler
   */
  constructor(actionType: new (scheduler: Scheduler, work: T) => SchedulerAction);
  
  /**
   * Flush all queued actions immediately
   * Executes all pending work synchronously
   * @param action - Optional specific action to flush
   */
  flush(action?: SchedulerAction): void;
}

/**
 * Singleton instance of the asynchronous scheduler
 * Exported as the default scheduler for async operations
 */
export const asapScheduler: AsynchronousScheduler;

/**
 * Default export - the asynchronous scheduler instance
 */
export default asapScheduler;