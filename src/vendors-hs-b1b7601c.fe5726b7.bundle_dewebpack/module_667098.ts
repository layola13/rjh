import { createOperatorSubscriber } from './operator-subscriber';
import { Observable, Subscriber } from 'rxjs';

export function scanInternals<T, R>(
  accumulator: (acc: R, value: T, index: number) => R,
  seed: R,
  hasSeed: boolean,
  emitOnNext: boolean,
  emitBeforeComplete?: boolean
): (source: Observable<T>, subscriber: Subscriber<R>) => void {
  return (source: Observable<T>, subscriber: Subscriber<R>): void => {
    let hasAccumulator = hasSeed;
    let accumulatorValue = seed;
    let currentIndex = 0;

    source.subscribe(
      createOperatorSubscriber(
        subscriber,
        (value: T) => {
          const index = currentIndex++;
          accumulatorValue = hasAccumulator
            ? accumulator(accumulatorValue, value, index)
            : ((hasAccumulator = true), value as unknown as R);

          if (emitOnNext) {
            subscriber.next(accumulatorValue);
          }
        },
        emitBeforeComplete
          ? () => {
              if (hasAccumulator) {
                subscriber.next(accumulatorValue);
              }
              subscriber.complete();
            }
          : undefined
      )
    );
  };
}