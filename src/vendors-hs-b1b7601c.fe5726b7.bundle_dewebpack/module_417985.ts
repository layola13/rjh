import { map } from './map';
import { innerFrom } from './innerFrom';
import { operate } from './operate';
import { mergeInternals } from './mergeInternals';

type ProjectFunction<T, R> = (value: T, index: number) => R;
type ProjectWithInnerIndex<T, R> = (outerValue: T, innerValue: any, outerIndex: number, innerIndex: number) => R;

export function mergeMap<T, R>(
  project: ProjectFunction<T, R>,
  concurrent?: number
): any;
export function mergeMap<T, R>(
  project: ProjectWithInnerIndex<T, R>,
  resultSelector: ProjectWithInnerIndex<T, R>,
  concurrent?: number
): any;
export function mergeMap<T, R>(
  project: ProjectFunction<T, R> | ProjectWithInnerIndex<T, R>,
  resultSelectorOrConcurrent?: number | ProjectWithInnerIndex<T, R>,
  concurrent: number = Infinity
): any {
  if (isFunction(resultSelectorOrConcurrent)) {
    return mergeMap(
      (outerValue: T, outerIndex: number) => {
        return map((innerValue: any, innerIndex: number) => {
          return resultSelectorOrConcurrent(outerValue, innerValue, outerIndex, innerIndex);
        })(innerFrom(project(outerValue, outerIndex)));
      },
      concurrent
    );
  }

  if (typeof resultSelectorOrConcurrent === 'number') {
    concurrent = resultSelectorOrConcurrent;
  }

  return operate((source: any, subscriber: any) => {
    return mergeInternals(source, subscriber, project, concurrent);
  });
}

function isFunction(value: any): value is Function {
  return typeof value === 'function';
}