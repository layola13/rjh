/**
 * Creates an Observable that emits sequential numbers on a specified time interval.
 * 
 * @module timer
 */

import { Observable } from 'rxjs';
import { SchedulerLike } from 'rxjs/internal/types';
import { async as asyncScheduler } from 'rxjs/internal/scheduler/async';
import { isScheduler } from 'rxjs/internal/util/isScheduler';
import { isValidDate } from 'rxjs/internal/util/isValidDate';

/**
 * Creates an Observable that starts emitting after an initial delay and then emits
 * sequentially increasing numbers at a specified interval.
 *
 * @param initialDelay - The initial delay time to wait before first emission.
 *                       Can be a Date (for absolute time) or number (milliseconds).
 *                       Defaults to 0.
 * @param period - The time interval between emissions in milliseconds.
 *                 If omitted or negative, completes after first emission.
 * @param scheduler - The scheduler to use for timing. Defaults to asyncScheduler.
 * @returns An Observable that emits an infinite sequence of numbers starting from 0.
 */
export declare function timer(
  initialDelay?: number | Date,
  period?: number,
  scheduler?: SchedulerLike
): Observable<number>;

/**
 * Creates an Observable that starts emitting after an initial delay and then emits
 * sequentially increasing numbers at a specified interval.
 *
 * @param initialDelay - The initial delay time to wait before first emission.
 *                       Can be a Date (for absolute time) or number (milliseconds).
 *                       Defaults to 0.
 * @param scheduler - The scheduler to use for timing. Defaults to asyncScheduler.
 * @returns An Observable that emits an infinite sequence of numbers starting from 0.
 */
export declare function timer(
  initialDelay?: number | Date,
  scheduler?: SchedulerLike
): Observable<number>;