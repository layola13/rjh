import { EMPTY, Observable, ObservableInput, OperatorFunction, timer } from 'rxjs';
import { operate } from 'rxjs/internal/operators/operate';
import { createOperatorSubscriber } from 'rxjs/internal/operators/createOperatorSubscriber';
import { innerFrom } from 'rxjs/internal/observable/innerFrom';

interface RepeatConfig {
  count?: number;
  delay?: number | ((iteration: number) => ObservableInput<unknown>);
}

export function repeat<T>(config?: number | RepeatConfig): OperatorFunction<T, T> {
  let count: number;
  let delay: number | ((iteration: number) => ObservableInput<unknown>) | undefined;
  let maxRepeatCount = Infinity;

  if (config != null) {
    if (typeof config === 'object') {
      count = config.count;
      maxRepeatCount = count === undefined ? Infinity : count;
      delay = config.delay;
    } else {
      maxRepeatCount = config;
    }
  }

  if (maxRepeatCount <= 0) {
    return function (): Observable<T> {
      return EMPTY;
    };
  }

  return operate((source: Observable<T>, subscriber) => {
    let sourceSubscription: any;
    let iteration = 0;

    const scheduleNextRepeat = (): void => {
      if (sourceSubscription != null || sourceSubscription?.unsubscribe) {
        sourceSubscription.unsubscribe();
      }
      sourceSubscription = null;

      if (delay != null) {
        const delayObservable =
          typeof delay === 'number'
            ? timer(delay)
            : innerFrom(delay(iteration));

        const delaySubscriber = createOperatorSubscriber(subscriber, () => {
          delaySubscriber.unsubscribe();
          subscribeToSource();
        });

        delayObservable.subscribe(delaySubscriber);
      } else {
        subscribeToSource();
      }
    };

    const subscribeToSource = (): void => {
      let shouldSchedule = false;

      sourceSubscription = source.subscribe(
        createOperatorSubscriber(subscriber, undefined, () => {
          ++iteration < maxRepeatCount
            ? sourceSubscription
              ? scheduleNextRepeat()
              : (shouldSchedule = true)
            : subscriber.complete();
        })
      );

      if (shouldSchedule) {
        scheduleNextRepeat();
      }
    };

    subscribeToSource();
  });
}