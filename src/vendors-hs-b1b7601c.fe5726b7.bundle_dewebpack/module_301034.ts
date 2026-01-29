import { ArgumentOutOfRangeError } from './ArgumentOutOfRangeError';
import { filter } from './filter';
import { throwIfEmpty } from './throwIfEmpty';
import { defaultIfEmpty } from './defaultIfEmpty';
import { take } from './take';
import { Observable, OperatorFunction } from './types';

export function elementAt<T>(index: number): OperatorFunction<T, T>;
export function elementAt<T, D>(index: number, defaultValue: D): OperatorFunction<T, T | D>;
export function elementAt<T, D = T>(index: number, defaultValue?: D): OperatorFunction<T, T | D> {
  if (index < 0) {
    throw new ArgumentOutOfRangeError();
  }

  const hasDefaultValue = arguments.length >= 2;

  return (source: Observable<T>): Observable<T | D> => {
    return source.pipe(
      filter((_value: T, currentIndex: number) => currentIndex === index),
      take(1),
      hasDefaultValue
        ? defaultIfEmpty(defaultValue!)
        : throwIfEmpty(() => new ArgumentOutOfRangeError())
    );
  };
}