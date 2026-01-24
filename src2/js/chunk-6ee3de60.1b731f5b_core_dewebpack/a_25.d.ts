/**
 * Module: a
 * Original ID: 22
 * Exports: a, b
 */

import { Observable, Scheduler } from './scheduler-types';

/**
 * A shared empty observable that completes immediately.
 * This observable completes synchronously without emitting any values.
 */
export declare const a: Observable<never>;

/**
 * Creates an empty observable that completes immediately.
 * If a scheduler is provided, the completion will be scheduled on that scheduler.
 * Otherwise, returns the shared empty observable instance.
 * 
 * @param scheduler - Optional scheduler to schedule the completion notification
 * @returns An observable that completes immediately without emitting values
 * 
 * @example
 *