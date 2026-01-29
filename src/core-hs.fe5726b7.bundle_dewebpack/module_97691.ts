function isSubsetOf<T>(this: Set<T>, other: Set<T> | Iterable<T>): boolean {
  const thisSet = toSetLike(this);
  const otherSet = toIterableWithSize(other);
  
  if (getSetSize(thisSet) > otherSet.size) {
    return false;
  }
  
  return iterateSet(thisSet, (element: T) => {
    if (!otherSet.includes(element)) {
      return false;
    }
    return undefined;
  }, true) !== false;
}

interface IterableWithSize<T> {
  size: number;
  includes(element: T): boolean;
}

function toSetLike<T>(value: unknown): Set<T> {
  // Implementation for converting to Set-like structure
  return value as Set<T>;
}

function getSetSize<T>(set: Set<T>): number {
  // Implementation for getting Set size
  return set.size;
}

function toIterableWithSize<T>(value: Set<T> | Iterable<T>): IterableWithSize<T> {
  // Implementation for converting to iterable with size
  return value as IterableWithSize<T>;
}

function iterateSet<T>(
  set: Set<T>,
  callback: (element: T) => false | undefined,
  earlyExit: boolean
): boolean | void {
  // Implementation for iterating over Set
  for (const element of set) {
    const result = callback(element);
    if (earlyExit && result === false) {
      return false;
    }
  }
}

export default isSubsetOf;