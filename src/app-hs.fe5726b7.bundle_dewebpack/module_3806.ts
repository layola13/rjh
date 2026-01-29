function baseIsEqual(a: unknown, b: unknown): boolean {
  // Placeholder implementation - needs actual equality logic
  return a === b;
}

export function findIndexOfKey<T>(entries: Array<[T, unknown]>, key: T): number {
  for (let index = entries.length; index--;) {
    if (baseIsEqual(entries[index][0], key)) {
      return index;
    }
  }
  return -1;
}