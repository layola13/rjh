import { concat } from './concat';
import { of } from './of';

export function endWith<T>(...values: T[]): (source: Observable<T>) => Observable<T> {
  return (source: Observable<T>): Observable<T> => {
    return concat(source, of(...values));
  };
}

interface Observable<T> {
  // Observable interface placeholder
}