import { operate } from './operate';
import { createOperatorSubscriber } from './createOperatorSubscriber';
import { Observable, OperatorFunction } from 'rxjs';

/**
 * Emits values emitted by the source Observable so long as each value satisfies
 * the given predicate, and then completes as soon as this predicate is not satisfied.
 *
 * @param predicate A function that evaluates a value emitted by the source Observable
 * and returns a boolean. Also takes the index as a second parameter.
 * @param inclusive When set to true, the value that caused predicate to return false
 * will also be emitted before completion.
 * @returns A function that returns an Observable that emits values from the source
 * Observable until the predicate returns false.
 */
export function takeWhile<T>(
  predicate: (value: T, index: number) => boolean,
  inclusive: boolean = false
): OperatorFunction<T, T> {
  return operate((source: Observable<T>, subscriber) => {
    let index = 0;
    
    source.subscribe(
      createOperatorSubscriber(subscriber, (value: T) => {
        const shouldContinue = predicate(value, index++);
        
        if (shouldContinue || inclusive) {
          subscriber.next(value);
        }
        
        if (!shouldContinue) {
          subscriber.complete();
        }
      })
    );
  });
}