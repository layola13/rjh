import { operate } from './operate';
import { createOperatorSubscriber } from './createOperatorSubscriber';
import { innerFrom } from './innerFrom';
import { noop } from './noop';
import { Observable } from './Observable';
import { MonoTypeOperatorFunction } from './types';

/**
 * Emits values until the notifier Observable emits a value.
 * 
 * @param notifier - The Observable that will signal to complete the source Observable.
 * @returns A function that returns an Observable that emits values from the source until notifier emits.
 */
export function takeUntil<T>(notifier: Observable<unknown>): MonoTypeOperatorFunction<T> {
  return operate((source, subscriber) => {
    innerFrom(notifier).subscribe(
      createOperatorSubscriber(subscriber, () => {
        return subscriber.complete();
      }, noop)
    );
    
    if (!subscriber.closed) {
      source.subscribe(subscriber);
    }
  });
}