import { Observable } from 'rxjs';
import { AsyncSubject } from 'rxjs';
import { isScheduler } from 'rxjs/internal/util/isScheduler';
import { SchedulerLike } from 'rxjs';
import { mapOneOrManyArgs } from 'rxjs/internal/operators/mapOneOrManyArgs';
import { subscribeOn } from 'rxjs/internal/operators/subscribeOn';
import { observeOn } from 'rxjs/internal/operators/observeOn';

type CallbackFunc = (...args: any[]) => void;
type ResultSelector<T> = (...args: any[]) => T;

export function bindCallbackInternals<T>(
  callbackFunc: CallbackFunc,
  resultSelector: ResultSelector<T> | undefined,
  schedulerOrResultSelector?: SchedulerLike | ResultSelector<T>,
  scheduler?: SchedulerLike
): (...args: any[]) => Observable<T> {
  if (schedulerOrResultSelector) {
    if (!isScheduler(schedulerOrResultSelector)) {
      return function (this: any, ...args: any[]): Observable<T> {
        return bindCallbackInternals(callbackFunc, resultSelector, scheduler)
          .apply(this, args)
          .pipe(mapOneOrManyArgs(schedulerOrResultSelector as ResultSelector<T>));
      };
    }
    scheduler = schedulerOrResultSelector;
  }

  if (scheduler) {
    return function (this: any, ...args: any[]): Observable<T> {
      return bindCallbackInternals(callbackFunc, resultSelector)
        .apply(this, args)
        .pipe(subscribeOn(scheduler), observeOn(scheduler));
    };
  }

  return function (this: any, ...callArgs: any[]): Observable<T> {
    const context = this;
    const subject = new AsyncSubject<T>();
    let isFirstCall = true;

    return new Observable<T>((observer) => {
      const subscription = subject.subscribe(observer);

      if (isFirstCall) {
        isFirstCall = false;
        let hasCompleted = false;
        let hasResult = false;

        callbackFunc.apply(context, [
          ...callArgs,
          function (...callbackArgs: any[]): void {
            if (resultSelector) {
              const errorArg = callbackArgs.shift();
              if (errorArg != null) {
                subject.error(errorArg);
                return;
              }
            }

            const result = callbackArgs.length > 1 ? callbackArgs : callbackArgs[0];
            subject.next(result);
            hasResult = true;

            if (hasCompleted) {
              subject.complete();
            }
          }
        ]);

        if (hasResult) {
          subject.complete();
        }

        hasCompleted = true;
      }

      return subscription;
    });
  };
}