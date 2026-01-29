import { asyncScheduler, SchedulerLike } from 'rxjs';
import { audit } from 'rxjs/operators';
import { timer } from 'rxjs';

/**
 * Audits values from the source Observable based on a time duration.
 * Ignores source values for a duration, then emits the most recent value,
 * then repeats this process.
 * 
 * @param duration - The duration in milliseconds to wait before emitting the most recent value
 * @param scheduler - The scheduler to use for managing timers (defaults to asyncScheduler)
 * @returns An operator function that returns an Observable that performs the audit operation
 */
export function auditTime<T>(
    duration: number,
    scheduler: SchedulerLike = asyncScheduler
) {
    return audit<T>(() => timer(duration, scheduler));
}