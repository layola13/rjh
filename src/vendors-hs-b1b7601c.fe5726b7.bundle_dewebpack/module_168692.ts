import { operate } from './operate';
import { createOperatorSubscriber } from './createOperatorSubscriber';
import { Observable, OperatorFunction } from 'rxjs';

/**
 * Returns an Observable that emits whether or not every item of the source satisfies the condition specified.
 * 
 * @param predicate A function for determining if an item meets a specified condition.
 * @param thisArg Optional object to use for `this` in the predicate function.
 * @returns An OperatorFunction that emits a single boolean value.
 */
export function every<T>(
  predicate: (value: T, index: number, source: Observable<T>) => boolean,
  thisArg?: unknown
): OperatorFunction<T, boolean> {
  return operate((source: Observable<T>, subscriber) => {
    let index = 0;
    
    source.subscribe(
      createOperatorSubscriber(
        subscriber,
        (value: T) => {
          if (!predicate.call(thisArg, value, index++, source)) {
            subscriber.next(false);
            subscriber.complete();
          }
        },
        () => {
          subscriber.next(true);
          subscriber.complete();
        }
      )
    );
  });
}