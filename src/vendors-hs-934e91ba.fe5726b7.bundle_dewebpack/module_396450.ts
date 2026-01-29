import getBaseIteratee from './module_69882';
import isArrayLike from './module_280873';
import createBaseFor from './module_34034';

export default function iteratee<T>(collection: T): any {
  return isArrayLike(collection) ? createBaseFor(collection) : getBaseIteratee(collection);
}