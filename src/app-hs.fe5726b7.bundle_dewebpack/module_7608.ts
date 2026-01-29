export function someCollection<T>(
  collection: T[] | null | undefined,
  value: T,
  comparator: (a: T, b: T) => boolean
): boolean {
  const length = collection == null ? 0 : collection.length;
  
  for (let index = 0; index < length; index++) {
    if (comparator(value, collection[index])) {
      return true;
    }
  }
  
  return false;
}