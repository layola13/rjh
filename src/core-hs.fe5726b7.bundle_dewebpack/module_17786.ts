type SetLike<T> = Set<T> | { has(value: T): boolean; size: number };

interface IteratorWithReturn<T> {
  next(): IteratorResult<T>;
  return?(value?: unknown): IteratorResult<T>;
}

interface SetOperations<T> {
  size: number;
  getIterator(): IteratorWithReturn<T>;
}

function toObject<T>(value: T): T {
  if (value == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  return value;
}

function hasSetElement<T>(set: SetLike<T>, element: T): boolean {
  return set.has(element);
}

function getSetSize(set: { size: number }): number {
  return set.size;
}

function getSetIterator<T>(set: SetOperations<T>): IteratorWithReturn<T> {
  return set.getIterator();
}

function iterateSet<T>(
  iterator: IteratorWithReturn<T>,
  callback: (value: T) => boolean | void
): boolean {
  let step: IteratorResult<T>;
  while (!(step = iterator.next()).done) {
    const result = callback(step.value);
    if (result === false) {
      return false;
    }
  }
  return true;
}

function closeIterator<T>(
  iterator: IteratorWithReturn<T>,
  _completionType: string,
  returnValue: boolean
): boolean {
  if (iterator.return) {
    iterator.return();
  }
  return returnValue;
}

export default function isSupersetOf<T>(
  this: SetLike<T>,
  otherSet: SetOperations<T>
): boolean {
  const currentSet = toObject(this);
  const otherSetOperations = getSetIterator(otherSet);
  
  if (getSetSize(currentSet) < otherSet.size) {
    return false;
  }
  
  const iterator = otherSetOperations;
  
  return iterateSet(iterator, (element: T) => {
    if (!hasSetElement(currentSet, element)) {
      return closeIterator(iterator, "normal", false);
    }
  }) !== false;
}