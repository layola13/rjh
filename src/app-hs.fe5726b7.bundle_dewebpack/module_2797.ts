import baseMap from './baseMap';
import arrayMap from './arrayMap';
import getIteratee from './getIteratee';
import isArray from './isArray';

function map<T, R>(collection: T[], iteratee: (value: T, index: number, array: T[]) => R): R[];
function map<T, R>(collection: Record<string, T>, iteratee: (value: T, key: string, collection: Record<string, T>) => R): R[];
function map<T, R>(collection: T[] | Record<string, T>, iteratee: ((value: T, indexOrKey: number | string, collection: T[] | Record<string, T>) => R) | string | number | object): R[] {
  return (isArray(collection) ? arrayMap : baseMap)(collection, getIteratee(iteratee));
}

export default map;