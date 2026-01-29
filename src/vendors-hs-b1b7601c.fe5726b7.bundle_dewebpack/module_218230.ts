import { operate } from 'rxjs/internal/operators/operate';
import { createOperatorSubscriber } from 'rxjs/internal/operators/createOperatorSubscriber';
import { innerFrom } from 'rxjs/internal/observable/innerFrom';
import { noop } from 'rxjs/internal/util/noop';
import { ObservableInput, OperatorFunction } from 'rxjs';

/**
 * Skips all emitted values from the source observable until the notifier observable emits.
 * 
 * @param notifier - Observable that controls when to start emitting values
 * @returns An operator function that skips values until notifier emits
 */
export function skipUntil<T>(notifier: ObservableInput<unknown>): OperatorFunction<T, T> {
  return operate((source, subscriber) => {
    let shouldEmit = false;
    
    const notifierSubscriber = createOperatorSubscriber(
      subscriber,
      () => {
        notifierSubscriber?.unsubscribe();
        shouldEmit = true;
      },
      noop
    );
    
    innerFrom(notifier).subscribe(notifierSubscriber);
    
    source.subscribe(
      createOperatorSubscriber(subscriber, (value: T) => {
        if (shouldEmit) {
          subscriber.next(value);
        }
      })
    );
  });
}