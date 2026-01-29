import forEach from './forEach';
import arrayEach from './arrayEach';
import getIteratee from './getIteratee';
import isArray from './isArray';

export default function each<T>(
  collection: T[] | Record<string, T>,
  iteratee: (value: T, indexOrKey: number | string, collection: T[] | Record<string, T>) => void | boolean
): T[] | Record<string, T> {
  return isArray(collection)
    ? arrayEach(collection, getIteratee(iteratee))
    : forEach(collection, getIteratee(iteratee));
}