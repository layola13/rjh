import { switchMap } from 'rxjs/operators';
import { operate } from './operate';
import { Observable, ObservableInput, OperatorFunction } from 'rxjs';

export function switchScan<T, R>(
  accumulator: (acc: R, value: T, index: number) => ObservableInput<R>,
  seed: R
): OperatorFunction<T, R> {
  return operate((source: Observable<T>, subscriber) => {
    let accumulatedValue: R | null = seed;

    const subscription = switchMap(
      (value: T, index: number) => accumulator(accumulatedValue as R, value, index),
      (outerValue: T, innerValue: R) => {
        accumulatedValue = innerValue;
        return innerValue;
      }
    )(source).subscribe(subscriber);

    return () => {
      accumulatedValue = null;
    };
  });
}