import { innerFrom } from './innerFrom';
import { operate } from './operate';
import { createOperatorSubscriber, OperatorSubscriber } from './OperatorSubscriber';
import { Observable } from './Observable';
import { ObservableInput, OperatorFunction } from './types';

/**
 * Projects each source value to an Observable which is merged in the output Observable,
 * emitting values only from the most recently projected Observable.
 *
 * @param project A function that accepts the current value and index, and returns an ObservableInput
 * @param resultSelector Optional function to transform the projected values
 * @returns An OperatorFunction that switches to the latest inner Observable
 */
export function switchMap<T, R, O extends ObservableInput<unknown>>(
  project: (value: T, index: number) => O,
  resultSelector?: (outerValue: T, innerValue: R, outerIndex: number, innerIndex: number) => R
): OperatorFunction<T, R> {
  return operate((source: Observable<T>, subscriber) => {
    let innerSubscriber: OperatorSubscriber<R> | null = null;
    let outerIndex = 0;
    let isComplete = false;

    const checkComplete = (): void => {
      if (isComplete && !innerSubscriber) {
        subscriber.complete();
      }
    };

    source.subscribe(
      createOperatorSubscriber(
        subscriber,
        (outerValue: T) => {
          innerSubscriber?.unsubscribe();

          let innerIndex = 0;
          const currentOuterIndex = outerIndex++;

          innerFrom(project(outerValue, currentOuterIndex)).subscribe(
            (innerSubscriber = createOperatorSubscriber(
              subscriber,
              (innerValue: R) => {
                const result = resultSelector
                  ? resultSelector(outerValue, innerValue, currentOuterIndex, innerIndex++)
                  : innerValue;
                return subscriber.next(result);
              },
              () => {
                innerSubscriber = null;
                checkComplete();
              }
            ))
          );
        },
        () => {
          isComplete = true;
          checkComplete();
        }
      )
    );
  });
}