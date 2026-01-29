import { concat } from './893651';

export function concatWith<T>(...sources: Array<Iterable<T> | ArrayLike<T>>): T[] {
  return concat(...sources);
}