export function filter<T>(
  array: T[] | null | undefined,
  predicate: (value: T, index: number, array: T[]) => boolean
): T[] {
  const length = array == null ? 0 : array.length;
  let resultIndex = 0;
  let currentIndex = -1;
  const result: T[] = [];

  while (++currentIndex < length) {
    const value = array![currentIndex];
    if (predicate(value, currentIndex, array!)) {
      result[resultIndex++] = value;
    }
  }

  return result;
}