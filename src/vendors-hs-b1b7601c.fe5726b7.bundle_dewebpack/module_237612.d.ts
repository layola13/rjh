/**
 * RxJS Timeout Operator with Fallback Observable
 * 
 * This module provides the timeoutWith operator, which throws an error or switches
 * to a fallback Observable if the source doesn't emit within a specified time frame.
 */

import { SchedulerLike } from './scheduler';
import { ObservableInput, OperatorFunction } from './observable';

/**
 * Configuration options for timeout behavior
 */
export interface TimeoutConfig<T, R> {
  /**
   * The Date object representing the absolute time to timeout at the first emission
   */
  first?: Date;
  
  /**
   * The number in milliseconds for how long between emissions before timing out
   */
  each?: number;
  
  /**
   * The scheduler to use for managing the timers
   */
  scheduler?: SchedulerLike;
  
  /**
   * A factory function that returns the fallback Observable to switch to
   */
  with: () => ObservableInput<R>;
}

/**
 * Timeout with a fallback Observable operator
 * 
 * Errors or switches to a fallback Observable if the source Observable does not emit
 * a value within the specified timeout period.
 * 
 * @template T - The type of values emitted by the source Observable
 * @template R - The type of values emitted by the fallback Observable
 * 
 * @param {Date | number} due - Either a Date for absolute timeout at first emission,
 *                               or a number (in milliseconds) for timeout between emissions
 * @param {ObservableInput<R>} withObservable - The fallback Observable to switch to on timeout
 * @param {SchedulerLike} [scheduler] - Optional scheduler for managing timeout timers (defaults to async scheduler)
 * 
 * @returns {OperatorFunction<T, T | R>} An operator function that returns an Observable that either
 *                                        mirrors the source or switches to the fallback Observable
 * 
 * @throws {TypeError} If no fallback Observable is provided
 * @throws {TypeError} If neither Date nor number timeout value is provided
 * 
 * @example
 * // Timeout after 5 seconds, switch to fallback
 * source$.pipe(
 *   timeoutWith(5000, of('timeout occurred'))
 * )
 * 
 * @example
 * // Timeout at specific date, switch to fallback
 * source$.pipe(
 *   timeoutWith(new Date('2024-01-01'), of('deadline passed'))
 * )
 */
export function timeoutWith<T, R>(
  due: Date | number,
  withObservable: ObservableInput<R>,
  scheduler?: SchedulerLike
): OperatorFunction<T, T | R>;