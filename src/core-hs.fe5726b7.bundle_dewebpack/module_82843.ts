interface SetLike<T> {
  has(value: T): boolean;
  add(value: T): void;
  delete(value: T): boolean;
}

interface IteratorResult<T> {
  value: T;
  done: boolean;
}

interface SetIterator<T> {
  next(): IteratorResult<T>;
}

interface IterableWithIterator<T> {
  getIterator(): SetIterator<T>;
}

/**
 * Performs symmetric difference operation on a Set.
 * Returns a new Set containing elements that are in either this Set or the provided Set, but not in both.
 * 
 * @param other - The Set-like object or iterable to perform symmetric difference with
 * @returns A new Set containing the symmetric difference
 */
function symmetricDifference<T>(this: Set<T>, other: IterableWithIterator<T>): Set<T> {
  const targetSet = toObject(this);
  const iterator = getIterator(other).getIterator();
  const resultSet = cloneSet(targetSet);
  
  iterateOver(iterator, (element: T) => {
    if (has(targetSet, element)) {
      remove(resultSet, element);
    } else {
      add(resultSet, element);
    }
  });
  
  return resultSet;
}

function toObject<T>(set: Set<T>): Set<T> {
  return set;
}

function getIterator<T>(iterable: IterableWithIterator<T>): IterableWithIterator<T> {
  return iterable;
}

function cloneSet<T>(set: Set<T>): Set<T> {
  return new Set(set);
}

function has<T>(set: Set<T>, value: T): boolean {
  return set.has(value);
}

function add<T>(set: Set<T>, value: T): void {
  set.add(value);
}

function remove<T>(set: Set<T>, value: T): void {
  set.delete(value);
}

function iterateOver<T>(iterator: SetIterator<T>, callback: (value: T) => void): void {
  let result = iterator.next();
  while (!result.done) {
    callback(result.value);
    result = iterator.next();
  }
}

export default symmetricDifference;