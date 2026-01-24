/**
 * Schedule an observable to emit and observe on a specific scheduler.
 * 
 * This function takes an observable source and wraps it so that:
 * - Subscriptions occur on the specified scheduler (subscribeOn)
 * - Notifications are delivered on the specified scheduler (observeOn)
 * 
 * @module scheduleObservable
 */

import { Observable } from 'rxjs';
import { SchedulerLike } from 'rxjs';

/**
 * Schedules both subscription and observation of an observable on a specific scheduler.
 * 
 * @template T - The type of values emitted by the observable
 * @param source - The observable source to be scheduled, can be any observable-like input
 * @param scheduler - The scheduler to use for both subscription and observation timing
 * @returns An observable that subscribes on and observes on the specified scheduler
 * 
 * @example
 *