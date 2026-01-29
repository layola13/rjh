import { operate, OperatorFunction } from 'rxjs';
import { innerFrom } from 'rxjs/internal/observable/innerFrom';
import { createOperatorSubscriber, OperatorSubscriber } from 'rxjs/internal/operators/OperatorSubscriber';
import { ObservableInput } from 'rxjs';

export function audit<T>(durationSelector: (value: T) => ObservableInput<unknown>): OperatorFunction<T, T> {
  return operate((source, subscriber) => {
    let hasValue = false;
    let lastValue: T | null = null;
    let durationSubscriber: OperatorSubscriber<unknown> | null = null;
    let isComplete = false;

    const endDuration = (): void => {
      durationSubscriber?.unsubscribe();
      durationSubscriber = null;

      if (hasValue) {
        hasValue = false;
        const value = lastValue;
        lastValue = null;
        subscriber.next(value!);
      }

      if (isComplete) {
        subscriber.complete();
      }
    };

    const cleanupDuration = (): void => {
      durationSubscriber = null;
      if (isComplete) {
        subscriber.complete();
      }
    };

    source.subscribe(
      createOperatorSubscriber(
        subscriber,
        (value: T) => {
          hasValue = true;
          lastValue = value;

          if (!durationSubscriber) {
            innerFrom(durationSelector(value)).subscribe(
              durationSubscriber = createOperatorSubscriber(subscriber, endDuration, cleanupDuration)
            );
          }
        },
        () => {
          isComplete = true;
          if (!hasValue || !durationSubscriber || durationSubscriber.closed) {
            subscriber.complete();
          }
        }
      )
    );
  });
}