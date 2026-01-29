type Predicate<T> = (value: T) => boolean;
type Iteratee<T, R> = (value: T) => R;

interface SetLike<T> {
  has(value: T): boolean;
  add(value: T): void;
}

function baseUniq<T, R = T>(
  array: T[],
  iteratee?: Iteratee<T, R> | null,
  comparator?: Predicate<R> | null
): T[] {
  let index = -1;
  let includes = arrayIncludes;
  const length = array.length;
  let isCommon = true;
  const result: T[] = [];
  let seen: T[] | R[] | SetLike<R> = result;

  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith;
  } else if (length >= 200) {
    const set = iteratee ? null : createSet(array);
    if (set) {
      return setToArray(set);
    }
    isCommon = false;
    includes = cacheHas;
    seen = new SetCache<R>();
  } else {
    seen = iteratee ? [] : result;
  }

  outer: while (++index < length) {
    const value = array[index];
    const computed = iteratee ? iteratee(value) : (value as unknown as R);
    const normalizedValue = comparator || value !== 0 ? value : 0;

    if (isCommon && computed === computed) {
      let seenIndex = (seen as (T[] | R[])).length;
      while (seenIndex--) {
        if ((seen as (T[] | R[]))[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        (seen as R[]).push(computed);
      }
      result.push(normalizedValue);
    } else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        (seen as R[]).push(computed);
      }
      result.push(normalizedValue);
    }
  }

  return result;
}

class SetCache<T> {
  private data: Map<T, boolean> = new Map();

  has(value: T): boolean {
    return this.data.has(value);
  }

  add(value: T): void {
    this.data.set(value, true);
  }

  get size(): number {
    return this.data.size;
  }
}

function arrayIncludes<T>(array: T[] | SetLike<T>, value: T): boolean {
  if (Array.isArray(array)) {
    return array.includes(value);
  }
  return array.has(value);
}

function arrayIncludesWith<T>(
  array: T[] | SetLike<T>,
  value: T,
  comparator?: Predicate<T> | null
): boolean {
  if (!Array.isArray(array)) {
    return array.has(value);
  }
  return array.some(item => comparator?.(item) ?? item === value);
}

function cacheHas<T>(cache: SetLike<T>, value: T): boolean {
  return cache.has(value);
}

function createSet<T>(array: T[]): Set<T> | null {
  return new Set(array);
}

function setToArray<T>(set: Set<T>): T[] {
  return Array.from(set);
}

export default baseUniq;