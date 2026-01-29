import { concatMap } from './concatMap';
import { isFunction } from './isFunction';

export function concatMapTo<T, R>(
  innerObservable: any,
  resultSelector?: (outerValue: T, innerValue: R, outerIndex: number, innerIndex: number) => R
): any {
  if (isFunction(resultSelector)) {
    return concatMap(() => innerObservable, resultSelector);
  }
  
  return concatMap(() => innerObservable);
}