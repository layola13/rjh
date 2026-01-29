import { EmptyError } from './error-types';
import { filter } from './operators/filter';
import { take } from './operators/take';
import { defaultIfEmpty } from './operators/defaultIfEmpty';
import { throwIfEmpty } from './operators/throwIfEmpty';
import { identity } from './util/identity';
import { Observable } from './Observable';
import { OperatorFunction } from './types';

export function first<T, D = T>(
  predicate?: (value: T, index: number, source: Observable<T>) => boolean,
  defaultValue?: D
): OperatorFunction<T, T | D> {
  const hasDefaultValue = arguments.length >= 2;

  return (source: Observable<T>): Observable<T | D> => {
    return source.pipe(
      predicate
        ? filter((value: T, index: number) => predicate(value, index, source))
        : identity,
      take(1),
      hasDefaultValue
        ? defaultIfEmpty(defaultValue!)
        : throwIfEmpty(() => new EmptyError())
    );
  };
}