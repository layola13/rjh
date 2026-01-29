import { operate } from './operate';
import { createOperatorSubscriber } from './createOperatorSubscriber';
import type { Observable } from './Observable';
import type { OperatorFunction } from './types';

/**
 * Emits true if the source Observable completes without emitting any values, false otherwise.
 * 
 * @returns An OperatorFunction that emits a boolean indicating whether the source was empty.
 */
export function isEmpty<T>(): OperatorFunction<T, boolean> {
  return operate((source: Observable<T>, subscriber) => {
    source.subscribe(
      createOperatorSubscriber(
        subscriber,
        () => {
          subscriber.next(false);
          subscriber.complete();
        },
        () => {
          subscriber.next(true);
          subscriber.complete();
        }
      )
    );
  });
}