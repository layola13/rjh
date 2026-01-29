import baseIsEqual from './baseIsEqual';
import get from './get';
import hasIn from './hasIn';
import isKey from './isKey';
import isStrictComparable from './isStrictComparable';
import matchesStrictComparable from './matchesStrictComparable';
import toKey from './toKey';

function baseMatchesProperty<T = unknown>(path: PropertyKey | PropertyKey[], srcValue: T): (object: unknown) => boolean {
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

export default baseMatchesProperty;