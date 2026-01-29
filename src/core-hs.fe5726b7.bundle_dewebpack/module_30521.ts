export function setDifference<T>(this: Set<T>, other: Iterable<T>): Set<T> {
  const currentSet = toObject(this);
  const otherSet = toSetLike(other);
  const resultSet = cloneSet(currentSet);

  if (getSetSize(currentSet) <= otherSet.size) {
    iterateSet(currentSet, (element: T) => {
      if (otherSet.includes(element)) {
        removeFromSet(resultSet, element);
      }
    });
  } else {
    iterateCollection(otherSet.getIterator(), (element: T) => {
      if (hasInSet(currentSet, element)) {
        removeFromSet(resultSet, element);
      }
    });
  }

  return resultSet;
}

interface SetLike<T> {
  size: number;
  includes(value: T): boolean;
  getIterator(): Iterator<T>;
}

function toObject<T>(set: Set<T>): Set<T> {
  return set;
}

function toSetLike<T>(iterable: Iterable<T>): SetLike<T> {
  return {
    size: 0,
    includes: (value: T) => false,
    getIterator: () => iterable[Symbol.iterator]()
  };
}

function cloneSet<T>(set: Set<T>): Set<T> {
  return new Set(set);
}

function getSetSize<T>(set: Set<T>): number {
  return set.size;
}

function hasInSet<T>(set: Set<T>, value: T): boolean {
  return set.has(value);
}

function removeFromSet<T>(set: Set<T>, value: T): boolean {
  return set.delete(value);
}

function iterateSet<T>(set: Set<T>, callback: (value: T) => void): void {
  set.forEach(callback);
}

function iterateCollection<T>(iterator: Iterator<T>, callback: (value: T) => void): void {
  let result = iterator.next();
  while (!result.done) {
    callback(result.value);
    result = iterator.next();
  }
}