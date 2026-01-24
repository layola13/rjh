/**
 * Type guard to check if a value is a Scheduler.
 * A Scheduler is an object that has a schedule method.
 * Commonly used in RxJS and reactive programming patterns.
 */
export declare function isScheduler(value: unknown): value is Scheduler;

/**
 * Represents a Scheduler interface.
 * A Scheduler controls when and how tasks are executed.
 */
export interface Scheduler {
  /**
   * Schedules a task to be executed.
   * @param work - The work to be executed
   * @param delay - Optional delay before execution
   * @param state - Optional state to pass to the work function
   * @returns A subscription that can be used to cancel the scheduled work
   */
  schedule<T = unknown>(
    work: (this: SchedulerAction<T>, state?: T) => void,
    delay?: number,
    state?: T
  ): Subscription;
}

/**
 * Represents a scheduled action.
 */
export interface SchedulerAction<T> extends Subscription {
  schedule(state?: T, delay?: number): Subscription;
}

/**
 * Represents a subscription that can be unsubscribed.
 */
export interface Subscription {
  unsubscribe(): void;
  readonly closed: boolean;
}