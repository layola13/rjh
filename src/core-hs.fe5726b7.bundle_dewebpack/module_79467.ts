type ReduceCallback<T, U> = (accumulator: U, currentValue: T, currentIndex: number, array: T[]) => U;

interface ReduceMethods {
  left: <T, U>(
    array: ArrayLike<T>,
    callback: ReduceCallback<T, U>,
    argumentsLength: number,
    initialValue?: U
  ) => U;
  right: <T, U>(
    array: ArrayLike<T>,
    callback: ReduceCallback<T, U>,
    argumentsLength: number,
    initialValue?: U
  ) => U;
}

import { aCallable } from './module_94743';
import { toObject } from './module_13818';
import { indexedObject } from './module_96346';
import { lengthOfArrayLike } from './module_40087';

const createReduceFunction = (isRight: boolean) => {
  return <T, U>(
    array: ArrayLike<T>,
    callback: ReduceCallback<T, U>,
    argumentsLength: number,
    initialValue?: U
  ): U => {
    aCallable(callback);
    
    const obj = toObject(array);
    const indexed = indexedObject(obj);
    const length = lengthOfArrayLike(obj);
    let index = isRight ? length - 1 : 0;
    const step = isRight ? -1 : 1;
    let accumulator: U;

    if (argumentsLength < 2) {
      while (true) {
        if (index in indexed) {
          accumulator = indexed[index] as unknown as U;
          index += step;
          break;
        }
        index += step;
        if (isRight ? index < 0 : length <= index) {
          throw new TypeError("Reduce of empty array with no initial value");
        }
      }
    } else {
      accumulator = initialValue!;
    }

    for (; isRight ? index >= 0 : length > index; index += step) {
      if (index in indexed) {
        accumulator = callback(accumulator, indexed[index], index, obj);
      }
    }

    return accumulator;
  };
};

const reduceMethods: ReduceMethods = {
  left: createReduceFunction(false),
  right: createReduceFunction(true)
};

export default reduceMethods;
export { reduceMethods };