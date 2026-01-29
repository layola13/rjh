import { left as reduceLeft } from './polyfills/array-reduce-implementation';

/**
 * Array.prototype.reduce polyfill implementation
 * @param callbackFn - Function to execute on each element
 * @param initialValue - Optional initial value for the accumulator
 * @returns The accumulated result
 */
function reduce<T, U>(
  this: T[],
  callbackFn: (accumulator: U, currentValue: T, currentIndex: number, array: T[]) => U,
  initialValue?: U
): U {
  const argumentCount = arguments.length;
  return reduceLeft(
    this,
    callbackFn,
    argumentCount,
    argumentCount > 1 ? initialValue : undefined
  );
}

export { reduce };