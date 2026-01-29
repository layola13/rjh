import { EmptyError } from './EmptyError';
import { filter } from './filter';
import { takeLast } from './takeLast';
import { throwIfEmpty } from './throwIfEmpty';
import { defaultIfEmpty } from './defaultIfEmpty';
import { identity } from './identity';
import { Observable, OperatorFunction } from './types';

export function last<T>(
  predicate?: (value: T, index: number, source: Observable<T>) => boolean,
  defaultValue?: T
): OperatorFunction<T, T> {
  const hasDefaultValue = arguments.length >= 2;

  return function (source: Observable<T>): Observable<T> {
    return source.pipe(
      predicate
        ? filter((value: T, index: number) => predicate(value, index, source))
        : identity,
      takeLast(1),
      hasDefaultValue
        ? defaultIfEmpty(defaultValue!)
        : throwIfEmpty(() => new EmptyError())
    );
  };
}