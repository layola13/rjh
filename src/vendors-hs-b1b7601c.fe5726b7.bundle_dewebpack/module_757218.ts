import { asyncScheduler, SchedulerLike } from 'rxjs';
import { throttle } from 'rxjs/operators';
import { timer } from 'rxjs';
import { MonoTypeOperatorFunction, ThrottleConfig } from 'rxjs';

/**
 * Emits a value from the source Observable, then ignores subsequent source values
 * for a duration determined by another Observable, then repeats this process.
 *
 * @param duration - Time to wait before emitting another value after
 *                   emitting the last value, measured in milliseconds.
 * @param scheduler - The scheduler to use for managing the timers that
 *                    handle the throttle duration. Defaults to asyncScheduler.
 * @param config - Configuration object to define leading and trailing behavior.
 * @returns A function that returns an Observable that performs the throttle operation.
 */
export function throttleTime<T>(
    duration: number,
    scheduler: SchedulerLike = asyncScheduler,
    config?: ThrottleConfig
): MonoTypeOperatorFunction<T> {
    const durationTimer = timer(duration, scheduler);
    return throttle(() => durationTimer, config);
}