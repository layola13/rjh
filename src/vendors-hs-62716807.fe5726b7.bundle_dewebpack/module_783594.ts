interface ArraySearchOptions {
  includes: <T>(array: T[], searchElement: T, fromIndex?: number) => boolean | number;
  indexOf: <T>(array: T[], searchElement: T, fromIndex?: number) => number;
}

function createArraySearchFunction(includesMode: boolean) {
  return function<T>(array: T[], searchElement: T, fromIndex?: number): boolean | number {
    const indexedObject = toIndexedObject(array);
    const length = getLength(indexedObject);
    const startIndex = toAbsoluteIndex(fromIndex, length);

    if (includesMode && searchElement !== searchElement) {
      for (let index = startIndex; index < length; index++) {
        const currentElement = indexedObject[index];
        if (currentElement !== currentElement) {
          return true;
        }
      }
    } else {
      for (let index = startIndex; index < length; index++) {
        if ((includesMode || index in indexedObject) && indexedObject[index] === searchElement) {
          return includesMode || index || 0;
        }
      }
    }

    return !includesMode && -1;
  };
}

function toIndexedObject<T>(value: T[]): T[] {
  // Convert value to indexed object (array-like)
  return value;
}

function getLength(obj: ArrayLike<unknown>): number {
  return obj.length;
}

function toAbsoluteIndex(index: number | undefined, length: number): number {
  if (index === undefined) return 0;
  if (index < 0) return Math.max(length + index, 0);
  return Math.min(index, length);
}

export const includes = createArraySearchFunction(true);
export const indexOf = createArraySearchFunction(false);

export default {
  includes,
  indexOf
} as ArraySearchOptions;