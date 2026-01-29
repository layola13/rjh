import { toObject } from './module_77064';
import { iteratorClose } from './module_50002';

export function tryCall<T, R>(
  iterator: Iterator<T>,
  callback: (value: T) => R,
  argument: T | [T, unknown],
  hasArguments: boolean
): R {
  try {
    return hasArguments
      ? callback(toObject(argument)[0], (argument as [T, unknown])[1])
      : callback(argument as T);
  } catch (error) {
    iteratorClose(iterator, 'throw', error);
    throw error;
  }
}