import { operate } from './operate';
import { createOperatorSubscriber } from './createOperatorSubscriber';
import { innerFrom } from './innerFrom';
import { identity } from './identity';
import { noop } from './noop';
import { popResultSelector } from './popResultSelector';
import { Observable, OperatorFunction, ObservableInput } from './types';

export function withLatestFrom<T, O extends unknown[]>(
  ...inputs: [...ObservableInput<O>[], ((...values: [T, ...O]) => unknown) | undefined]
): OperatorFunction<T, [T, ...O] | unknown> {
  const resultSelector = popResultSelector(inputs);

  return operate((source: Observable<T>, subscriber) => {
    const inputCount = inputs.length;
    const latestValues = new Array<O[number]>(inputCount);
    const hasValue = inputs.map(() => false);
    let allHasValue = false;

    const subscribeToInput = (index: number): void => {
      innerFrom(inputs[index]).subscribe(
        createOperatorSubscriber(
          subscriber,
          (value: O[number]) => {
            latestValues[index] = value;
            if (!allHasValue && !hasValue[index]) {
              hasValue[index] = true;
              allHasValue = hasValue.every(identity);
              if (allHasValue) {
                hasValue.length = 0;
              }
            }
          },
          noop
        )
      );
    };

    for (let index = 0; index < inputCount; index++) {
      subscribeToInput(index);
    }

    source.subscribe(
      createOperatorSubscriber(subscriber, (value: T) => {
        if (allHasValue) {
          const combinedValues: [T, ...O] = [value, ...latestValues] as [T, ...O];
          subscriber.next(
            resultSelector ? resultSelector(...combinedValues) : combinedValues
          );
        }
      })
    );
  });
}