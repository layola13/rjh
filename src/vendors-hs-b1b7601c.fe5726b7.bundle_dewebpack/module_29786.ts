import { operate } from './operate';
import { mergeInternals } from './mergeInternals';

export function mergeScan<T, R>(
  accumulator: (acc: R, value: T, index: number) => R,
  seed: R,
  concurrent: number = Infinity
): (source: Observable<T>) => Observable<R> {
  return operate((source, subscriber) => {
    let accumulatedValue = seed;

    return mergeInternals(
      source,
      subscriber,
      (value: T, index: number) => {
        return accumulator(accumulatedValue, value, index);
      },
      concurrent,
      (result: R) => {
        accumulatedValue = result;
      },
      false,
      undefined,
      () => {
        accumulatedValue = null as any;
      }
    );
  });
}