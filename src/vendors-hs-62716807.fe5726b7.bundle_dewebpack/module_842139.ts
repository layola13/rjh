import { getBuiltInPropertyNames } from './getBuiltInPropertyNames';
import { hasOwnProperty } from './hasOwnProperty';
import { toIndexedObject } from './toIndexedObject';
import { indexOf } from './indexOf';
import { hiddenKeys } from './hiddenKeys';

const nativePush = Array.prototype.push;

/**
 * Gets the own enumerable property names of an object, excluding hidden keys.
 * 
 * @param target - The target object to get property names from
 * @param excludedKeys - Array of keys to exclude from enumeration
 * @returns Array of property names
 */
export function getOwnPropertyNames(
  target: object,
  excludedKeys: readonly string[]
): string[] {
  const indexedObject = toIndexedObject(target);
  let currentIndex = 0;
  const result: string[] = [];
  let key: string;

  // Collect all own enumerable properties except hidden keys
  for (key in indexedObject) {
    if (!hasOwnProperty(hiddenKeys, key) && hasOwnProperty(indexedObject, key)) {
      nativePush.call(result, key);
    }
  }

  // Process excluded keys, adding them if they exist and aren't already in result
  while (excludedKeys.length > currentIndex) {
    key = excludedKeys[currentIndex++];
    if (hasOwnProperty(indexedObject, key)) {
      const keyIndexInResult = indexOf(result, key);
      if (keyIndexInResult === -1) {
        nativePush.call(result, key);
      }
    }
  }

  return result;
}