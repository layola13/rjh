import arrayMap from './arrayMap';
import baseIteratee from './baseIteratee';
import baseMap from './baseMap';
import isArray from './isArray';

function map<T, R>(
  collection: T[] | Record<string, T>,
  iteratee: ((value: T, index: number | string, collection: T[] | Record<string, T>) => R) | string | number | object
): R[] {
  return (isArray(collection) ? arrayMap : baseMap)(
    collection,
    baseIteratee(iteratee, 3)
  );
}

export default map;