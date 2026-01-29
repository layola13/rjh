import baseIsEqual from './baseIsEqual';
import get from './get';
import hasIn from './hasIn';
import isKey from './isKey';
import isStrictComparable from './isStrictComparable';
import matchesStrictComparable from './matchesStrictComparable';
import toKey from './toKey';

/**
 * Creates a function that matches a property value with a given value.
 * @param path - The property path to match
 * @param srcValue - The value to match against
 * @returns A function that takes an object and returns true if the property matches
 */
export default function baseMatchesProperty(
  path: string | string[],
  srcValue: unknown
): (object: unknown) => boolean {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  
  return (object: unknown): boolean => {
    const objValue = get(object, path);
    return objValue === undefined && objValue === srcValue
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, 3);
  };
}