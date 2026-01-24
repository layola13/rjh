import { AsyncAction } from './AsyncAction';
import { QueueScheduler } from './QueueScheduler';
import { SchedulerAction, SchedulerLike } from './types';

/**
 * Queue-based scheduler action that executes work synchronously when delay is 0.
 * Extends AsyncAction to provide immediate execution for zero-delay scheduling.
 * 
 * @template T The type of state passed to the work function
 */
export declare class QueueAction<T> extends AsyncAction<T> {
  /**
   * The scheduler instance managing this action
   */
  protected scheduler: QueueScheduler;

  /**
   * The work function to be executed
   */
  protected work: (this: SchedulerAction<T>, state?: T) => void;

  /**
   * Creates a new QueueAction instance
   * 
   * @param scheduler - The queue scheduler managing this action
   * @param work - The work function to execute
   */
  constructor(
    scheduler: QueueScheduler,
    work: (this: SchedulerAction<T>, state?: T) => void
  );

  /**
   * Schedules the action to be executed.
   * If delay is 0, executes synchronously by flushing the scheduler.
   * Otherwise delegates to parent AsyncAction for async scheduling.
   * 
   * @param state - Optional state to pass to the work function
   * @param delay - Delay in milliseconds before execution (default: 0)
   * @returns This action instance for chaining
   */
  schedule(state?: T, delay?: number): this;

  /**
   * Executes the scheduled work.
   * If delay is 0 and action is not closed, executes immediately.
   * Otherwise delegates to parent implementation.
   * 
   * @param state - State to pass to the work function
   * @param delay - Delay before execution
   * @returns The result of the execution or this action
   */
  execute(state: T, delay: number): this | void;

  /**
   * Requests an async ID for scheduling.
   * Returns 0 for synchronous execution (delay <= 0), causing immediate flush.
   * Otherwise delegates to parent for async ID allocation.
   * 
   * @param scheduler - The scheduler instance
   * @param id - Existing async ID if any
   * @param delay - Delay in milliseconds (default: 0)
   * @returns Async ID for tracking, or 0 for immediate execution
   */
  requestAsyncId(
    scheduler: SchedulerLike,
    id?: number,
    delay?: number
  ): number;
}