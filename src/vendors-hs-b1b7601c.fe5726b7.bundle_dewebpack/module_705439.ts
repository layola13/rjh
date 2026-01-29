import { map } from './map';
import { innerFrom } from './innerFrom';
import { operate } from './operate';
import { createOperatorSubscriber, OperatorSubscriber } from './OperatorSubscriber';
import { Observable } from './Observable';
import { ObservableInput, OperatorFunction } from './types';

export function exhaustMap<T, R, O extends ObservableInput<unknown>>(
  project: (value: T, index: number) => O,
  resultSelector?: (outerValue: T, innerValue: unknown, outerIndex: number, innerIndex: number) => R
): OperatorFunction<T, R | unknown> {
  if (resultSelector) {
    return (source: Observable<T>) => {
      return source.pipe(
        exhaustMap((outerValue: T, outerIndex: number) => {
          return innerFrom(project(outerValue, outerIndex)).pipe(
            map((innerValue: unknown, innerIndex: number) => {
              return resultSelector(outerValue, innerValue, outerIndex, innerIndex);
            })
          );
        })
      );
    };
  }

  return operate((source: Observable<T>, subscriber: OperatorSubscriber<T, R | unknown>) => {
    let outerIndex = 0;
    let innerSubscriber: OperatorSubscriber<unknown, unknown> | null = null;
    let isComplete = false;

    source.subscribe(
      createOperatorSubscriber(
        subscriber,
        (outerValue: T) => {
          if (!innerSubscriber) {
            innerSubscriber = createOperatorSubscriber(
              subscriber,
              undefined,
              () => {
                innerSubscriber = null;
                if (isComplete) {
                  subscriber.complete();
                }
              }
            );
            innerFrom(project(outerValue, outerIndex++)).subscribe(innerSubscriber);
          }
        },
        () => {
          isComplete = true;
          if (!innerSubscriber) {
            subscriber.complete();
          }
        }
      )
    );
  });
}