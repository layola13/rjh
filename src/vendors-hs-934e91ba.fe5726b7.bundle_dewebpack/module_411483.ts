import castPath from './castPath';
import isArguments from './isArguments';
import isArray from './isArray';
import isIndex from './isIndex';
import isLength from './isLength';
import toKey from './toKey';

/**
 * Checks if `path` exists on `object`.
 *
 * @param object - The object to query
 * @param path - The path to check
 * @param hasFunc - The function to check properties
 * @returns Returns `true` if `path` exists, else `false`
 */
export default function hasPath(
  object: unknown,
  path: string | readonly (string | number)[],
  hasFunc: (obj: unknown, key: string | number) => boolean
): boolean {
  const resolvedPath = castPath(path, object);
  const pathLength = resolvedPath.length;
  let index = -1;
  let hasProperty = false;
  let currentObject: unknown = object;

  while (++index < pathLength) {
    const key = toKey(resolvedPath[index]);
    hasProperty = currentObject != null && hasFunc(currentObject, key);
    
    if (!hasProperty) {
      break;
    }
    
    currentObject = (currentObject as Record<string | number, unknown>)[key];
  }

  if (hasProperty || ++index !== pathLength) {
    return hasProperty;
  }

  const length = currentObject == null ? 0 : (currentObject as { length?: unknown }).length;
  
  return (
    isLength(length) &&
    isIndex(key, length) &&
    (isArray(currentObject) || isArguments(currentObject))
  );
}