/**
 * Module: a
 * Original ID: 70
 * Exports: throwError
 */

import { Observable } from './Observable';
import type { SchedulerLike } from './types';

/**
 * Creates an Observable that immediately emits an error notification.
 * 
 * @template T - The type of the observable (never emits values, only errors)
 * @param error - The error to emit
 * @param scheduler - Optional scheduler to schedule the error emission
 * @returns An Observable that emits an error notification
 * 
 * @example
 *