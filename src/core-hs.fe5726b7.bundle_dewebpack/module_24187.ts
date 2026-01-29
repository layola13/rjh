import { aCallable } from './72839';
import { SetHelpers } from './68801';
import { getSetSize } from './82711';
import { getSetLike } from './84100';
import { iterateSet } from './2314';
import { iterateSimple } from './29190';

interface SetLike<T> {
  size: number;
  has(value: T): boolean;
  keys(): Iterator<T>;
  getIterator?(): Iterator<T>;
  includes?(value: T): boolean;
}

/**
 * Returns the intersection of two sets.
 * Creates a new Set containing only elements present in both sets.
 */
export default function setIntersection<T>(this: Set<T>, other: unknown): Set<T> {
  const thisSet = aCallable(this);
  const otherSetLike = getSetLike<T>(other);
  const resultSet = new SetHelpers.Set<T>();

  const hasCustomMethods = 
    otherSetLike.has !== SetHelpers.$has || 
    otherSetLike.keys !== SetHelpers.$keys;

  if (hasCustomMethods && getSetSize(thisSet) > otherSetLike.size) {
    if (otherSetLike.getIterator) {
      iterateSimple(otherSetLike.getIterator(), (element: T) => {
        if (SetHelpers.has(thisSet, element)) {
          SetHelpers.add(resultSet, element);
        }
      });
    }

    if (getSetSize(resultSet) < 2) {
      return resultSet;
    }

    const intermediateSet = resultSet;
    const finalResultSet = new SetHelpers.Set<T>();
    
    iterateSet(thisSet, (element: T) => {
      if (SetHelpers.has(intermediateSet, element)) {
        SetHelpers.add(finalResultSet, element);
      }
    });

    return finalResultSet;
  } else {
    iterateSet(thisSet, (element: T) => {
      if (otherSetLike.includes?.(element)) {
        SetHelpers.add(resultSet, element);
      }
    });
  }

  return resultSet;
}