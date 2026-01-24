/**
 * Executes a scheduled task using a scheduler and manages subscription lifecycle.
 * 
 * @template T - The type of state passed to the scheduler
 * @param subscription - The subscription object to manage scheduled work
 * @param scheduler - The scheduler instance that controls task timing
 * @param work - The work function to be executed on schedule
 * @param delay - The delay in milliseconds before executing the work (default: 0)
 * @param repeat - Whether to repeatedly execute the work (default: false)
 * @returns The scheduled subscription if not repeating, otherwise undefined
 */
export declare function executeSchedule<T = unknown>(
  subscription: Subscription,
  scheduler: Scheduler,
  work: () => void,
  delay?: number,
  repeat?: boolean
): Subscription | undefined;

/**
 * Represents a subscription that can be unsubscribed to cancel scheduled work.
 */
export interface Subscription {
  /**
   * Adds a teardown/child subscription to be called when this subscription unsubscribes.
   * @param teardown - The subscription or teardown logic to add
   */
  add(teardown: Subscription | (() => void)): void;
}

/**
 * Represents a scheduler that controls the timing of task execution.
 */
export interface Scheduler {
  /**
   * Schedules work to be executed.
   * @param work - The work function to execute, or null for repeat scheduling
   * @param delay - The delay in milliseconds before execution
   * @returns A subscription representing the scheduled work
   */
  schedule(work: ((this: SchedulerAction) => void) | null, delay: number): Subscription;
}

/**
 * Represents a scheduled action with control methods.
 */
export interface SchedulerAction extends Subscription {
  /**
   * Schedules this action to be executed again.
   * @param state - Optional state to pass to the scheduled action
   * @param delay - The delay in milliseconds before re-execution
   * @returns A subscription representing the rescheduled work
   */
  schedule(state: unknown, delay: number): Subscription;
  
  /**
   * Unsubscribes and cancels the scheduled action.
   */
  unsubscribe(): void;
}