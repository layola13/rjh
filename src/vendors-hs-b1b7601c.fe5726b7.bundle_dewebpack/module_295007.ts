import { reduce } from './module_603637';
import { isFunction } from './module_419132';

/**
 * Returns the minimum value in an array.
 * @param comparatorOrArray - Either a comparator function or the array will be processed by reduce
 * @returns A reducer function that finds the minimum value
 */
export function min<T>(comparatorOrArray: ((a: T, b: T) => number) | unknown): (array: T[]) => T {
  return reduce(
    isFunction(comparatorOrArray)
      ? (current: T, next: T): T => {
          return (comparatorOrArray as (a: T, b: T) => number)(current, next) < 0 ? current : next;
        }
      : (current: T, next: T): T => {
          return current < next ? current : next;
        }
  );
}