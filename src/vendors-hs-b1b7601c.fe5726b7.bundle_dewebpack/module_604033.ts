import { innerFrom } from './innerFrom';
import { executeSchedule } from './executeSchedule';
import { createOperatorSubscriber } from './createOperatorSubscriber';
import { Subscriber } from './Subscriber';
import { ObservableInput, SchedulerLike } from './types';

export function mergeInternals<T, R>(
  source: ObservableInput<T>,
  subscriber: Subscriber<R>,
  project: (value: T, index: number) => ObservableInput<R>,
  concurrent: number,
  onBeforeNext?: (value: R) => void,
  isResultSelector?: boolean,
  scheduler?: SchedulerLike,
  onFinalize?: () => void
): () => void {
  const buffer: T[] = [];
  let activeCount = 0;
  let sourceIndex = 0;
  let isComplete = false;

  const checkComplete = (): void => {
    if (isComplete && buffer.length === 0 && activeCount === 0) {
      subscriber.complete();
    }
  };

  const doInnerSub = (value: T): void => {
    if (activeCount < concurrent) {
      subscribeToInner(value);
    } else {
      buffer.push(value);
    }
  };

  const subscribeToInner = (outerValue: T): void => {
    if (isResultSelector) {
      subscriber.next(outerValue as unknown as R);
    }

    activeCount++;
    let isInnerComplete = false;

    innerFrom(project(outerValue, sourceIndex++)).subscribe(
      createOperatorSubscriber(
        subscriber,
        (innerValue: R) => {
          onBeforeNext?.(innerValue);
          if (isResultSelector) {
            doInnerSub(innerValue as unknown as T);
          } else {
            subscriber.next(innerValue);
          }
        },
        () => {
          isInnerComplete = true;
        },
        undefined,
        () => {
          if (isInnerComplete) {
            try {
              activeCount--;

              const processBuffer = (): void => {
                const bufferedValue = buffer.shift()!;
                if (scheduler) {
                  executeSchedule(subscriber, scheduler, () => {
                    subscribeToInner(bufferedValue);
                  });
                } else {
                  subscribeToInner(bufferedValue);
                }
              };

              while (buffer.length > 0 && activeCount < concurrent) {
                processBuffer();
              }

              checkComplete();
            } catch (error) {
              subscriber.error(error);
            }
          }
        }
      )
    );
  };

  source.subscribe(
    createOperatorSubscriber(
      subscriber,
      doInnerSub,
      () => {
        isComplete = true;
        checkComplete();
      }
    )
  );

  return () => {
    onFinalize?.();
  };
}