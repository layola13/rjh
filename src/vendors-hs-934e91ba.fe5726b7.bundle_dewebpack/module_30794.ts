import getKeys from './getKeys';
import getTag from './getTag';
import isArrayLike from './isArrayLike';
import isString from './isString';
import stringSize from './stringSize';

/**
 * Gets the size of a collection.
 * 
 * @param collection - The collection to inspect
 * @returns The collection size
 */
export default function size(collection: unknown): number {
  if (collection == null) {
    return 0;
  }

  if (isArrayLike(collection)) {
    return isString(collection) ? stringSize(collection) : collection.length;
  }

  const tag = getTag(collection);
  
  if (tag === '[object Map]' || tag === '[object Set]') {
    return (collection as Map<unknown, unknown> | Set<unknown>).size;
  }

  return getKeys(collection).length;
}