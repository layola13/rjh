import uncurryThis from './uncurryThis';
import hasOwnProperty from './hasOwnProperty';
import toIndexedObject from './toIndexedObject';
import { indexOf } from './arrayIndexOf';
import hiddenKeys from './hiddenKeys';

const push = uncurryThis([].push);

/**
 * Returns an array of enumerable property names from an object, excluding hidden keys.
 * Includes properties from an additional array if they exist on the object.
 * 
 * @param target - The object to get enumerable properties from
 * @param additionalKeys - Additional property keys to check
 * @returns Array of enumerable property names
 */
export default function getObjectKeys(
  target: object,
  additionalKeys: string[]
): string[] {
  const indexedObject = toIndexedObject(target);
  let propertyKey: string;
  let currentIndex = 0;
  const result: string[] = [];

  // Collect all enumerable properties except hidden keys
  for (propertyKey in indexedObject) {
    if (!hasOwnProperty(hiddenKeys, propertyKey) && hasOwnProperty(indexedObject, propertyKey)) {
      push(result, propertyKey);
    }
  }

  // Add additional keys if they exist on the object and aren't already included
  while (additionalKeys.length > currentIndex) {
    propertyKey = additionalKeys[currentIndex++];
    if (hasOwnProperty(indexedObject, propertyKey) && (~indexOf(result, propertyKey) || push(result, propertyKey)));
  }

  return result;
}