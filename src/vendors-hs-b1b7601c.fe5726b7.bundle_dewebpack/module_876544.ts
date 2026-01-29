import { switchMap } from './switchMap';
import { isFunction } from './isFunction';

export function switchMapTo<T, R>(
  innerObservable: unknown,
  resultSelector?: (outerValue: T, innerValue: R, outerIndex: number, innerIndex: number) => unknown
): unknown {
  if (isFunction(resultSelector)) {
    return switchMap(() => innerObservable, resultSelector);
  }
  
  return switchMap(() => innerObservable);
}