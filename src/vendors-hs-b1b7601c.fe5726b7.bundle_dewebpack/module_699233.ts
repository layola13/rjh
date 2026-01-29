import { innerFrom } from './innerFrom';
import { operate } from './operate';
import { noop } from './noop';
import { createOperatorSubscriber } from './createOperatorSubscriber';
import type { Observable } from './Observable';
import type { MonoTypeOperatorFunction } from './types';

/**
 * Emits the most recently emitted value from the source Observable whenever
 * another Observable, the notifier, emits.
 *
 * @param notifier - The Observable that triggers emission from the source.
 * @returns A function that returns an Observable that emits values from the source
 * when the notifier emits.
 */
export function sample<T>(notifier: Observable<unknown>): MonoTypeOperatorFunction<T> {
  return operate((source, subscriber) => {
    let hasValue = false;
    let lastValue: T | null = null;

    source.subscribe(
      createOperatorSubscriber(subscriber, (value: T) => {
        hasValue = true;
        lastValue = value;
      })
    );

    innerFrom(notifier).subscribe(
      createOperatorSubscriber(
        subscriber,
        () => {
          if (hasValue) {
            hasValue = false;
            const valueToEmit = lastValue;
            lastValue = null;
            subscriber.next(valueToEmit);
          }
        },
        noop
      )
    );
  });
}