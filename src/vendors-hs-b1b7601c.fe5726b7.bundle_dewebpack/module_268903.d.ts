/**
 * Throttle operator for RxJS observables.
 * 
 * Emits a value from the source Observable, then ignores subsequent source values
 * for a duration determined by another Observable, then repeats this process.
 * 
 * @module throttle
 */

import { operate } from './operate';
import { createOperatorSubscriber } from './createOperatorSubscriber';
import { innerFrom } from './innerFrom';
import { Observable, OperatorFunction, ObservableInput } from 'rxjs';

/**
 * Configuration options for the throttle operator.
 */
export interface ThrottleConfig {
  /**
   * If true, the throttle will emit the first value immediately.
   * @default true
   */
  leading?: boolean;

  /**
   * If true, the throttle will emit the last value when the duration completes.
   * @default false
   */
  trailing?: boolean;
}

/**
 * Throttles emissions from the source Observable based on a duration Observable.
 * 
 * @template T - The type of values emitted by the source Observable
 * @param durationSelector - A function that receives a value from the source Observable
 *                          and returns an Observable that indicates the throttle duration
 * @param config - Configuration object for leading and trailing behavior
 * @returns An operator function that returns a throttled Observable
 * 
 * @example
 *