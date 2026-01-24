/**
 * Module: module_12
 * Provides empty observable creators with optional scheduler support
 */

import { Observable } from './observable';
import { SchedulerLike } from './types/scheduler';

/**
 * A pre-defined empty observable that completes immediately.
 * This is optimized for cases where no scheduler is needed.
 */
export const emptyObservable: Observable<never> = new Observable<never>((subscriber) => {
  subscriber.complete();
});

/**
 * Creates an empty observable that completes immediately.
 * If a scheduler is provided, the completion will be scheduled on that scheduler.
 * Otherwise, returns the pre-defined empty observable for performance optimization.
 * 
 * @param scheduler - Optional scheduler to schedule the completion notification
 * @returns An observable that emits no items and completes immediately (or on the scheduler)
 * 
 * @example
 *