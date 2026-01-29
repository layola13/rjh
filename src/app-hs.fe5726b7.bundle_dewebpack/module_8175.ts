import castPath from './castPath';
import isArguments from './isArguments';
import isArray from './isArray';
import isIndex from './isIndex';
import isLength from './isLength';
import toKey from './toKey';

export default function hasPath(
  object: unknown,
  path: string | ReadonlyArray<string | number>,
  hasFunc: (obj: any, key: string | number) => boolean
): boolean {
  const pathArray = castPath(path, object);
  const pathLength = pathArray.length;
  let index = -1;
  let hasProperty = false;
  let currentObject: any = object;

  while (++index < pathLength) {
    const key = toKey(pathArray[index]);
    hasProperty = currentObject != null && hasFunc(currentObject, key);
    
    if (!hasProperty) {
      break;
    }
    
    currentObject = currentObject[key];
  }

  if (hasProperty || ++index !== pathLength) {
    return hasProperty;
  }

  const length = currentObject == null ? 0 : currentObject.length;
  return (
    !!length &&
    isLength(length) &&
    isIndex(key!, length) &&
    (isArray(currentObject) || isArguments(currentObject))
  );
}