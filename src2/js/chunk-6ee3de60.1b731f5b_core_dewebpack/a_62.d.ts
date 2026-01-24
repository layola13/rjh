/**
 * Scheduler class for managing asynchronous task scheduling
 * Provides methods to schedule actions with optional delays
 */
export declare class Scheduler {
  /**
   * The action class constructor used to create scheduled actions
   */
  readonly SchedulerAction: SchedulerActionConstructor;

  /**
   * Function to get the current timestamp
   * Defaults to Date.now
   */
  readonly now: () => number;

  /**
   * Creates a new Scheduler instance
   * @param schedulerAction - The action class constructor for creating scheduled actions
   * @param now - Optional function to get current timestamp, defaults to Date.now
   */
  constructor(
    schedulerAction: SchedulerActionConstructor,
    now?: () => number
  );

  /**
   * Schedules a work function to be executed
   * @param work - The work function to execute
   * @param delay - Optional delay in milliseconds before execution (default: 0)
   * @param state - Optional state to pass to the work function
   * @returns A scheduled action instance
   */
  schedule<T = unknown>(
    work: (state?: T) => void,
    delay?: number,
    state?: T
  ): SchedulerAction<T>;

  /**
   * Static method to get the current timestamp
   * @returns Current time in milliseconds since Unix epoch
   */
  static now(): number;
}

/**
 * Represents a scheduled action that can be executed
 */
export interface SchedulerAction<T = unknown> {
  /**
   * Schedules the action with optional state and delay
   * @param state - Optional state data
   * @param delay - Optional delay in milliseconds
   * @returns The scheduled action instance
   */
  schedule(state?: T, delay?: number): this;
}

/**
 * Constructor type for SchedulerAction
 */
export interface SchedulerActionConstructor {
  new <T = unknown>(
    scheduler: Scheduler,
    work: (state?: T) => void
  ): SchedulerAction<T>;
}