import { toObject } from './to-object';
import { lengthOfArrayLike } from './length-of-array-like';
import { setArrayLength } from './set-array-length';
import { deletePropertyOrThrow } from './delete-property-or-throw';

/**
 * Polyfill for Array.prototype.unshift
 * Inserts elements at the beginning of an array and returns the new length.
 */
export function unshift<T>(this: T[], ...elements: T[]): number {
  const obj = toObject(this);
  const length = lengthOfArrayLike(obj);
  const elementCount = elements.length;

  if (elementCount > 0) {
    setArrayLength(length + elementCount);

    // Shift existing elements to the right
    for (let currentIndex = length - 1; currentIndex >= 0; currentIndex--) {
      const newIndex = currentIndex + elementCount;
      if (currentIndex in obj) {
        obj[newIndex] = obj[currentIndex];
      } else {
        deletePropertyOrThrow(obj, newIndex);
      }
    }

    // Insert new elements at the beginning
    for (let insertIndex = 0; insertIndex < elementCount; insertIndex++) {
      obj[insertIndex] = elements[insertIndex];
    }
  }

  return setArrayLength(obj, length + elementCount);
}