/**
 * shareReplay operator type definitions
 * 
 * Shares a single subscription among multiple subscribers and replays a specified
 * number of emissions to new subscribers.
 */

import { MonoTypeOperatorFunction, SchedulerLike } from 'rxjs';

/**
 * Configuration object for shareReplay operator
 */
export interface ShareReplayConfig {
  /**
   * Maximum number of values to buffer and replay to new subscribers
   * @default Infinity
   */
  bufferSize?: number;

  /**
   * Maximum time in milliseconds that values can be held in the buffer
   * @default Infinity
   */
  windowTime?: number;

  /**
   * Scheduler to use for managing the timing of emissions
   * @default undefined
   */
  scheduler?: SchedulerLike;

  /**
   * Whether to reset the shared observable when the reference count drops to zero
   * @default false
   */
  refCount?: boolean;
}

/**
 * Share source and replay specified number of emissions on subscription.
 * 
 * This operator shares a single subscription to the underlying source among
 * multiple subscribers and replays a configurable number of emissions to
 * any new subscribers.
 * 
 * @param config - Configuration object with replay settings
 * @returns A MonoTypeOperatorFunction that shares and replays values
 * 
 * @example
 *