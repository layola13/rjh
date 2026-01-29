import { concat } from 'rxjs';
import { take } from 'rxjs/operators';
import { ignoreElements } from 'rxjs/operators';
import { mapTo } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { innerFrom } from 'rxjs/internal/observable/innerFrom';
import { Observable, ObservableInput, OperatorFunction } from 'rxjs';

export function delayWhen<T>(
  delayDurationSelector: (value: T, index: number) => ObservableInput<unknown>,
  subscriptionDelay?: Observable<unknown>
): OperatorFunction<T, T> {
  if (subscriptionDelay) {
    return (source: Observable<T>): Observable<T> => {
      return concat(
        subscriptionDelay.pipe(take(1), ignoreElements()),
        source.pipe(delayWhen(delayDurationSelector))
      );
    };
  }

  return mergeMap((value: T, index: number): Observable<T> => {
    return innerFrom(delayDurationSelector(value, index)).pipe(
      take(1),
      mapTo(value)
    );
  });
}