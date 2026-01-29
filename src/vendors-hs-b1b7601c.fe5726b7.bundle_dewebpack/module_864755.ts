import { operate } from './operate';
import { createOperatorSubscriber } from './createOperatorSubscriber';
import { Observable, OperatorFunction } from './types';

export function skipWhile<T>(
  predicate: (value: T, index: number) => boolean
): OperatorFunction<T, T> {
  return operate((source: Observable<T>, subscriber) => {
    let hasSkippingEnded = false;
    let index = 0;

    source.subscribe(
      createOperatorSubscriber(subscriber, (value: T) => {
        if (!hasSkippingEnded) {
          hasSkippingEnded = !predicate(value, index++);
        }
        
        if (hasSkippingEnded) {
          subscriber.next(value);
        }
      })
    );
  });
}