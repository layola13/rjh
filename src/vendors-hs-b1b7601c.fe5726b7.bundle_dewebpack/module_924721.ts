import { Subscription } from 'rxjs';
import { operate } from 'rxjs/internal/operators/operate';
import { innerFrom } from 'rxjs/internal/observable/innerFrom';
import { createOperatorSubscriber } from 'rxjs/internal/operators/OperatorSubscriber';
import { noop } from 'rxjs/internal/util/noop';
import { arrRemove } from 'rxjs/internal/util/arrRemove';
import { Observable, ObservableInput, OperatorFunction } from 'rxjs';

/**
 * Buffers the source Observable values starting from an emission from openings
 * and ending when the output of closingSelector emits.
 */
export function bufferToggle<T, O>(
  openings: ObservableInput<O>,
  closingSelector: (value: O) => ObservableInput<unknown>
): OperatorFunction<T, T[]> {
  return operate((source: Observable<T>, subscriber) => {
    const buffers: T[][] = [];

    innerFrom(openings).subscribe(
      createOperatorSubscriber(
        subscriber,
        (openValue: O) => {
          const buffer: T[] = [];
          buffers.push(buffer);

          const closingSubscription = new Subscription();
          closingSubscription.add(
            innerFrom(closingSelector(openValue)).subscribe(
              createOperatorSubscriber(
                subscriber,
                () => {
                  arrRemove(buffers, buffer);
                  subscriber.next(buffer);
                  closingSubscription.unsubscribe();
                },
                noop
              )
            )
          );
        },
        noop
      )
    );

    source.subscribe(
      createOperatorSubscriber(
        subscriber,
        (value: T) => {
          for (const buffer of buffers) {
            buffer.push(value);
          }
        },
        () => {
          while (buffers.length > 0) {
            subscriber.next(buffers.shift()!);
          }
          subscriber.complete();
        }
      )
    );
  });
}