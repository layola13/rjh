import { mergeMap } from './mergeMap';
import { isFunction } from './isFunction';

export function concatMap<T, R>(
  project: (value: T, index: number) => R,
  concurrent?: number
): R;
export function concatMap<T, R>(
  project: (value: T, index: number) => R,
  resultSelector?: (outerValue: T, innerValue: R, outerIndex: number, innerIndex: number) => R
): R;
export function concatMap<T, R>(
  projectOrConcurrent: ((value: T, index: number) => R) | number,
  resultSelectorOrConcurrent?: ((outerValue: T, innerValue: R, outerIndex: number, innerIndex: number) => R) | number
): R {
  if (isFunction(resultSelectorOrConcurrent)) {
    return mergeMap(projectOrConcurrent as (value: T, index: number) => R, resultSelectorOrConcurrent, 1);
  }
  return mergeMap(projectOrConcurrent as (value: T, index: number) => R, 1);
}