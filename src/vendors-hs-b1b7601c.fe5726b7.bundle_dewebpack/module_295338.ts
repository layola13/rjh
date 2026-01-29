import { Observable } from 'rxjs';
import { EMPTY } from 'rxjs';
import type { SchedulerLike } from 'rxjs';

/**
 * Creates an Observable that emits a sequence of numbers within a specified range.
 * 
 * @param start - The starting value of the range (or end value if `end` is not provided)
 * @param end - The end value of the range (exclusive)
 * @param scheduler - Optional scheduler to control the timing of emissions
 * @returns An Observable that emits numbers in the specified range
 */
export function range(
  start: number,
  end?: number,
  scheduler?: SchedulerLike
): Observable<number> {
  if (end == null) {
    end = start;
    start = 0;
  }

  if (end <= 0) {
    return EMPTY;
  }

  const finalValue = end + start;

  return new Observable<number>(
    scheduler
      ? (subscriber) => {
          let currentValue = start;
          return scheduler.schedule(function () {
            if (currentValue < finalValue) {
              subscriber.next(currentValue++);
              this.schedule();
            } else {
              subscriber.complete();
            }
          });
        }
      : (subscriber) => {
          for (let value = start; value < finalValue && !subscriber.closed; ) {
            subscriber.next(value++);
          }
          subscriber.complete();
        }
  );
}