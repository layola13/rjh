import { EmptyError } from './EmptyError';
import { operate } from './operate';
import { createOperatorSubscriber } from './createOperatorSubscriber';
import { MonoTypeOperatorFunction, OperatorFunction } from './types';

/**
 * Throws an error if the Observable completes without emitting any values.
 * 
 * @param errorFactory - Factory function that returns the error to throw when empty
 * @returns An operator function that throws if the source completes empty
 */
export function throwIfEmpty<T>(
  errorFactory: () => Error = createDefaultEmptyError
): MonoTypeOperatorFunction<T> {
  return operate((source, subscriber) => {
    let hasValue = false;
    
    source.subscribe(
      createOperatorSubscriber(
        subscriber,
        (value: T) => {
          hasValue = true;
          subscriber.next(value);
        },
        () => {
          if (hasValue) {
            subscriber.complete();
          } else {
            subscriber.error(errorFactory());
          }
        }
      )
    );
  });
}

function createDefaultEmptyError(): EmptyError {
  return new EmptyError();
}