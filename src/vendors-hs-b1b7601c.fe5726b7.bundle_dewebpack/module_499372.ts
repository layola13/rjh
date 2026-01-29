import { Observable } from 'rxjs';
import { executeSchedule } from './executeSchedule';
import type { SchedulerLike } from 'rxjs';

export function scheduleAsyncIterable<T>(
  iterable: AsyncIterable<T>,
  scheduler: SchedulerLike
): Observable<T> {
  if (!iterable) {
    throw new Error("Iterable cannot be null");
  }

  return new Observable<T>((subscriber) => {
    executeSchedule(subscriber, scheduler, () => {
      const asyncIterator = iterable[Symbol.asyncIterator]();

      executeSchedule(
        subscriber,
        scheduler,
        () => {
          asyncIterator.next().then((result) => {
            if (result.done) {
              subscriber.complete();
            } else {
              subscriber.next(result.value);
            }
          });
        },
        0,
        true
      );
    });
  });
}