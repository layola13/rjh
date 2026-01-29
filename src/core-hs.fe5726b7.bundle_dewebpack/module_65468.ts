interface SetLike<T> {
  size: number;
  has(value: T): boolean;
  getIterator(): Iterator<T>;
  includes(value: T): boolean;
}

type IterationResult = boolean | void;

type IteratorCallback<T> = (value: T) => IterationResult;

function iterateSet<T>(
  set: Set<T>,
  callback: IteratorCallback<T>,
  returnEarly: boolean
): boolean {
  for (const value of set) {
    const result = callback(value);
    if (returnEarly && result === false) {
      return false;
    }
  }
  return true;
}

function iterateIterator<T>(
  iterator: Iterator<T>,
  callback: (value: T) => false | void
): boolean {
  let result = iterator.next();
  while (!result.done) {
    const callbackResult = callback(result.value);
    if (callbackResult === false) {
      return false;
    }
    result = iterator.next();
  }
  return true;
}

function closeIterator(iterator: Iterator<unknown>, mode: string, value: boolean): boolean {
  if (iterator.return) {
    iterator.return();
  }
  return value;
}

function getSetSize<T>(set: Set<T>): number {
  return set.size;
}

function toSet<T>(value: unknown): Set<T> {
  if (value instanceof Set) {
    return value;
  }
  return new Set<T>();
}

export default function isDisjointFrom<T>(this: Set<T>, other: SetLike<T> | Iterable<T>): boolean {
  const currentSet = toSet<T>(this);
  const otherSet = toSet<T>(other);

  if (getSetSize(currentSet) <= otherSet.size) {
    return iterateSet(
      currentSet,
      (element: T): false | void => {
        if (otherSet.includes(element)) {
          return false;
        }
      },
      true
    ) !== false;
  }

  const iterator = otherSet.getIterator();
  return iterateIterator(
    iterator,
    (element: T): false | void => {
      if (currentSet.has(element)) {
        return closeIterator(iterator, "normal", false);
      }
    }
  ) !== false;
}