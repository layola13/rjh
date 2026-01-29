import { Observable } from 'rxjs';
import { async as asyncScheduler } from 'rxjs/internal/scheduler/async';
import { isScheduler } from 'rxjs/internal/util/isScheduler';
import { isValidDate } from 'rxjs/internal/util/isValidDate';
import type { SchedulerLike } from 'rxjs';

/**
 * Creates an Observable that emits sequential numbers on a specified scheduler.
 * 
 * @param initialDelay - The initial delay time in milliseconds before the first emission, or a Date object
 * @param period - The period between emissions in milliseconds
 * @param scheduler - The scheduler to use for timing
 * @returns An Observable that emits sequential numbers
 */
export function timer(
  initialDelay: number | Date = 0,
  period?: number | SchedulerLike,
  scheduler: SchedulerLike = asyncScheduler
): Observable<number> {
  let emissionPeriod = -1;

  if (period != null) {
    if (isScheduler(period)) {
      scheduler = period;
    } else {
      emissionPeriod = period;
    }
  }

  return new Observable<number>((subscriber) => {
    let delay: number;
    
    if (isValidDate(initialDelay)) {
      delay = (initialDelay as Date).getTime() - scheduler.now();
    } else {
      delay = initialDelay as number;
    }

    if (delay < 0) {
      delay = 0;
    }

    let index = 0;

    return scheduler.schedule(function (this: any) {
      if (!subscriber.closed) {
        subscriber.next(index++);

        if (emissionPeriod >= 0) {
          this.schedule(undefined, emissionPeriod);
        } else {
          subscriber.complete();
        }
      }
    }, delay);
  });
}