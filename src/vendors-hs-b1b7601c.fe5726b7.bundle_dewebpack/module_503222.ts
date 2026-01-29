import { Observable } from 'rxjs';
import { iterator } from 'rxjs/internal/symbol/iterator';
import { isFunction } from 'rxjs/internal/util/isFunction';
import { executeSchedule } from 'rxjs/internal/util/executeSchedule';
import type { SchedulerLike } from 'rxjs';

export function scheduleIterable<T>(
  iterable: Iterable<T>,
  scheduler: SchedulerLike
): Observable<T> {
  return new Observable<T>((subscriber) => {
    let iteratorInstance: Iterator<T> | undefined;

    return executeSchedule(
      subscriber,
      scheduler,
      () => {
        iteratorInstance = iterable[iterator]();

        executeSchedule(
          subscriber,
          subscriber,
          () => {
            let iteratorResult: IteratorResult<T>;
            let value: T;
            let done: boolean | undefined;

            try {
              iteratorResult = iteratorInstance!.next();
              value = iteratorResult.value;
              done = iteratorResult.done;
            } catch (error) {
              subscriber.error(error);
              return;
            }

            if (done) {
              subscriber.complete();
            } else {
              subscriber.next(value);
            }
          },
          0,
          true
        );
      },
      () => {
        if (isFunction(iteratorInstance?.return)) {
          iteratorInstance!.return();
        }
      }
    );
  });
}