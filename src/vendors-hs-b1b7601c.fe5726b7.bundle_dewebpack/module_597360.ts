import { mergeMap } from './mergeMap';
import { isFunction } from './isFunction';

export function mergeMapTo<T, R>(
  innerObservable: unknown,
  resultSelector?: ((outerValue: T, innerValue: R, outerIndex: number, innerIndex: number) => R) | number,
  concurrent: number = Infinity
): unknown {
  if (isFunction(resultSelector)) {
    return mergeMap(
      () => innerObservable,
      resultSelector,
      concurrent
    );
  }

  if (typeof resultSelector === 'number') {
    concurrent = resultSelector;
  }

  return mergeMap(
    () => innerObservable,
    concurrent
  );
}