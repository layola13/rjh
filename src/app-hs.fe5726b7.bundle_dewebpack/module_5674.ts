import createSet from './module_2824';
import arrayIncludes from './module_9440';
import cacheHas from './module_7608';
import setHas from './module_4124';
import createSetFromArray from './module_8180';
import setToArray from './module_8552';

type Iteratee<T, R> = (value: T) => R;

interface SetLike<T> {
  has(value: T): boolean;
  add(value: T): this;
}

/**
 * Creates a duplicate-free version of an array using optional iteratee for comparisons.
 * 
 * @param array - The array to inspect
 * @param iteratee - The iteratee invoked per element for comparison
 * @param comparator - The comparator invoked to compare elements
 * @returns Returns the new duplicate-free array
 */
function baseUniq<T, R = T>(
  array: T[],
  iteratee?: Iteratee<T, R> | null,
  comparator?: ((a: R, b: R) => boolean) | null
): T[] {
  const LARGE_ARRAY_SIZE = 200;
  
  let index = -1;
  let includes = arrayIncludes;
  const { length } = array;
  let isCommon = true;
  const result: T[] = [];
  let seen: T[] | R[] | SetLike<R> = result;

  if (comparator) {
    isCommon = false;
    includes = cacheHas;
  } else if (length >= LARGE_ARRAY_SIZE) {
    const set = iteratee ? null : createSetFromArray(array);
    if (set) {
      return setToArray(set);
    }
    isCommon = false;
    includes = setHas;
    seen = createSet();
  } else {
    seen = iteratee ? [] : result;
  }

  outer: while (++index < length) {
    const value = array[index];
    const computed = iteratee ? iteratee(value) : (value as unknown as R);
    const comparableValue = comparator || value !== 0 ? value : 0;

    if (isCommon && computed === computed) {
      let seenIndex = (seen as R[]).length;
      while (seenIndex--) {
        if ((seen as R[])[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        (seen as R[]).push(computed);
      }
      result.push(comparableValue);
    } else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        (seen as R[] | SetLike<R> & { push?: (value: R) => void }).push?.(computed) ?? 
        (seen as SetLike<R>).add(computed);
      }
      result.push(comparableValue);
    }
  }

  return result;
}

export default baseUniq;