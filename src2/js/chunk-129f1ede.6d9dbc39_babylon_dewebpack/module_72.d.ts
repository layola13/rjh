/**
 * Scheduler class that manages asynchronous task scheduling.
 * Provides functionality to schedule actions with delays and track current time.
 */
export declare class Scheduler {
  /**
   * The action class used to create scheduled tasks.
   */
  readonly SchedulerAction: SchedulerActionConstructor;

  /**
   * Function that returns the current timestamp in milliseconds.
   * Defaults to Date.now if not provided.
   */
  readonly now: () => number;

  /**
   * Creates a new Scheduler instance.
   * 
   * @param SchedulerAction - Constructor for creating scheduled actions
   * @param now - Optional function to get current time, defaults to Date.now
   */
  constructor(
    SchedulerAction: SchedulerActionConstructor,
    now?: () => number
  );

  /**
   * Schedules a work function to be executed.
   * 
   * @param work - The function to execute when the action runs
   * @param delay - Delay in milliseconds before execution (default: 0)
   * @param state - Optional state to pass to the work function
   * @returns The created SchedulerAction instance
   */
  schedule<T = unknown>(
    work: (this: SchedulerAction<T>, state?: T) => void,
    delay?: number,
    state?: T
  ): SchedulerAction<T>;

  /**
   * Returns the current timestamp in milliseconds.
   * Static method that delegates to Date.now.
   */
  static now(): number;
}

/**
 * Interface representing a scheduled action.
 */
export interface SchedulerAction<T = unknown> {
  /**
   * Schedules this action to execute.
   * 
   * @param state - Optional state to pass to the work function
   * @param delay - Delay in milliseconds before execution
   * @returns This SchedulerAction instance for chaining
   */
  schedule(state?: T, delay?: number): this;
}

/**
 * Constructor type for SchedulerAction.
 */
export interface SchedulerActionConstructor {
  new <T = unknown>(
    scheduler: Scheduler,
    work: (this: SchedulerAction<T>, state?: T) => void
  ): SchedulerAction<T>;
}