import { observeNotification } from './observeNotification';
import { operate } from './operate';
import { createOperatorSubscriber } from './createOperatorSubscriber';
import type { Observable } from './Observable';
import type { ObservableNotification } from './types';
import type { OperatorFunction } from './types';

/**
 * Converts an Observable of ObservableNotification objects into the emissions
 * that they represent.
 *
 * @return An operator function that dematerializes notification objects.
 */
export function dematerialize<T>(): OperatorFunction<ObservableNotification<T>, T> {
  return operate((source: Observable<ObservableNotification<T>>, subscriber) => {
    source.subscribe(
      createOperatorSubscriber(subscriber, (notification: ObservableNotification<T>) => {
        return observeNotification(notification, subscriber);
      })
    );
  });
}