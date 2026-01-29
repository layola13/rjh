import { operate } from './operate';
import { createOperatorSubscriber } from './createOperatorSubscriber';
import type { MonoTypeOperatorFunction, Observer } from './types';

export function pairwise<T>(): MonoTypeOperatorFunction<[T, T]> {
  return operate((source, subscriber) => {
    let previousValue: T;
    let hasPrevious = false;

    source.subscribe(
      createOperatorSubscriber(subscriber, (currentValue: T) => {
        const prev = previousValue;
        previousValue = currentValue;

        if (hasPrevious) {
          subscriber.next([prev, currentValue]);
        }

        hasPrevious = true;
      })
    );
  });
}