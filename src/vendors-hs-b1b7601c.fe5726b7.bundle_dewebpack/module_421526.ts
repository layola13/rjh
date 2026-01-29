import { Notification } from './notification';
import { operate } from './operate';
import { createOperatorSubscriber } from './createOperatorSubscriber';
import { Observable } from './observable';
import { OperatorFunction } from './types';

/**
 * Converts all notifications from source observable (next, error and complete) 
 * into Notification objects that are emitted on the output observable.
 * 
 * @returns An operator function that returns an observable that emits Notification objects.
 */
export function materialize<T>(): OperatorFunction<T, Notification<T>> {
  return operate((source: Observable<T>, subscriber) => {
    source.subscribe(
      createOperatorSubscriber(
        subscriber,
        (value: T) => {
          subscriber.next(Notification.createNext(value));
        },
        () => {
          subscriber.next(Notification.createComplete());
          subscriber.complete();
        },
        (error: unknown) => {
          subscriber.next(Notification.createError(error));
          subscriber.complete();
        }
      )
    );
  });
}