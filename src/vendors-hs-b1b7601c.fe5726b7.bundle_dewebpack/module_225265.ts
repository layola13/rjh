import { operate } from './operate';
import { createOperatorSubscriber } from './createOperatorSubscriber';
import { Observable, OperatorFunction } from './types';

/**
 * Filters values emitted by the source Observable based on a predicate function.
 * 
 * @param predicate - Function to test each value for a condition
 * @param thisArg - Optional object to use as `this` context in the predicate
 * @returns An OperatorFunction that emits only values that pass the predicate test
 */
export function filter<T>(
  predicate: (value: T, index: number) => boolean,
  thisArg?: unknown
): OperatorFunction<T, T> {
  return operate((source: Observable<T>, subscriber: Subscriber<T>) => {
    let index = 0;
    
    source.subscribe(
      createOperatorSubscriber(subscriber, (value: T) => {
        if (predicate.call(thisArg, value, index++)) {
          subscriber.next(value);
        }
      })
    );
  });
}