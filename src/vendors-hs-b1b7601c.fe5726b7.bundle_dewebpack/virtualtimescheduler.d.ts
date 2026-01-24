/**
 * Virtual Time Scheduler Module
 * Provides deterministic scheduling for testing time-dependent RxJS operations
 */

import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';
import { AsyncScheduler } from 'rxjs/internal/scheduler/AsyncScheduler';
import { Subscription } from 'rxjs';

/**
 * Virtual Time Scheduler
 * A scheduler that runs on a virtual clock, allowing precise control over time progression
 * Useful for testing time-based observables without actual delays
 */
export declare class VirtualTimeScheduler extends AsyncScheduler {
  /**
   * Time factor for frame calculations (10ms per frame)
   */
  static readonly frameTimeFactor: 10;

  /**
   * Maximum number of frames to process before stopping
   */
  maxFrames: number;

  /**
   * Current frame number (virtual time position)
   */
  frame: number;

  /**
   * Current action index for ordering
   */
  index: number;

  /**
   * Creates a new VirtualTimeScheduler
   * @param schedulerActionCtor - Constructor for scheduler actions (defaults to VirtualAction)
   * @param maxFrames - Maximum frames to execute (defaults to Infinity)
   */
  constructor(
    schedulerActionCtor?: typeof VirtualAction,
    maxFrames?: number
  );

  /**
   * Executes all scheduled actions up to maxFrames
   * Processes actions in order of their scheduled delay
   * @throws Error if any action execution fails
   */
  flush(): void;
}

/**
 * Virtual Action
 * An action that executes on a virtual timeline
 * Maintains execution order through index tracking
 */
export declare class VirtualAction<T> extends AsyncAction<T> {
  /**
   * The scheduler managing this action
   */
  scheduler: VirtualTimeScheduler;

  /**
   * The work function to execute
   */
  work: (this: VirtualAction<T>, state?: T) => void;

  /**
   * Index for maintaining execution order among actions with same delay
   */
  index: number;

  /**
   * Whether this action is active (not rescheduled)
   */
  active: boolean;

  /**
   * Creates a new VirtualAction
   * @param scheduler - The VirtualTimeScheduler instance
   * @param work - The work function to execute
   * @param index - Order index (auto-incremented if not provided)
   */
  constructor(
    scheduler: VirtualTimeScheduler,
    work: (this: VirtualAction<T>, state?: T) => void,
    index?: number
  );

  /**
   * Schedules the action to execute after a delay
   * @param state - State to pass to the work function
   * @param delay - Delay in virtual time units (defaults to 0)
   * @returns Subscription for the scheduled action, or EMPTY if delay is not finite
   */
  schedule(state?: T, delay?: number): Subscription;

  /**
   * Requests an async ID for scheduling
   * Calculates absolute frame time and inserts action into sorted queue
   * @param scheduler - The scheduler instance
   * @param id - Existing ID (unused in virtual scheduling)
   * @param delay - Relative delay in frames
   * @returns Always returns 1 (virtual ID)
   */
  requestAsyncId(
    scheduler: VirtualTimeScheduler,
    id?: number,
    delay?: number
  ): number;

  /**
   * Recycles an async ID (no-op in virtual scheduling)
   * @param scheduler - The scheduler instance
   * @param id - ID to recycle
   * @param delay - Delay value
   */
  recycleAsyncId(
    scheduler: VirtualTimeScheduler,
    id?: number,
    delay?: number
  ): void;

  /**
   * Internal execution method
   * Only executes if action is still active
   * @param state - State to pass to work function
   * @param delay - Delay value
   * @returns Result of work execution or undefined if inactive
   */
  protected _execute(state: T, delay: number): unknown;

  /**
   * Comparator for sorting actions by delay and index
   * @param actionA - First action to compare
   * @param actionB - Second action to compare
   * @returns -1 if A comes first, 1 if B comes first, 0 if equal
   */
  static sortActions<T>(
    actionA: VirtualAction<T>,
    actionB: VirtualAction<T>
  ): number;
}