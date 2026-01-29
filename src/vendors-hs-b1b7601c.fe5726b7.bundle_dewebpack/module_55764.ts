import { operate } from './operate';
import { createOperatorSubscriber } from './createOperatorSubscriber';
import { MonoTypeOperatorFunction, OperatorFunction } from './types';

/**
 * Emits a given value if the source Observable completes without emitting any next value,
 * otherwise mirrors the source Observable.
 * 
 * @template T The type of elements in the source observable
 * @param defaultValue The default value to emit if the source is empty
 * @returns An operator function that returns the source observable or the default value
 */
export function defaultIfEmpty<T>(defaultValue: T): MonoTypeOperatorFunction<T>;
export function defaultIfEmpty<T, R>(defaultValue: R): OperatorFunction<T, T | R>;
export function defaultIfEmpty<T, R>(defaultValue: T | R): OperatorFunction<T, T | R> {
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
          if (!hasValue) {
            subscriber.next(defaultValue);
          }
          subscriber.complete();
        }
      )
    );
  });
}