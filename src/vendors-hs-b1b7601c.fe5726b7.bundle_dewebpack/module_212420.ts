import { operate } from './operate';
import { noop } from './noop';
import { createOperatorSubscriber } from './createOperatorSubscriber';
import { innerFrom } from './innerFrom';
import { Observable, OperatorFunction, ObservableInput } from './types';

export function debounce<T>(
  durationSelector: (value: T) => ObservableInput<unknown>
): OperatorFunction<T, T> {
  return operate((source: Observable<T>, subscriber) => {
    let hasValue = false;
    let lastValue: T | null = null;
    let durationSubscriber: any | null = null;

    const emitValue = (): void => {
      durationSubscriber?.unsubscribe();
      durationSubscriber = null;

      if (hasValue) {
        hasValue = false;
        const value = lastValue;
        lastValue = null;
        subscriber.next(value!);
      }
    };

    source.subscribe(
      createOperatorSubscriber(
        subscriber,
        (value: T) => {
          durationSubscriber?.unsubscribe();
          hasValue = true;
          lastValue = value;
          durationSubscriber = createOperatorSubscriber(
            subscriber,
            emitValue,
            noop
          );
          innerFrom(durationSelector(value)).subscribe(durationSubscriber);
        },
        () => {
          emitValue();
          subscriber.complete();
        },
        undefined,
        () => {
          lastValue = null;
          durationSubscriber = null;
        }
      )
    );
  });
}