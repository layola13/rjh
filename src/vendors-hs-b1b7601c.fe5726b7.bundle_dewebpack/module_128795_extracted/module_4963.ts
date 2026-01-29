export function filter<T>(
  array: T[] | null | undefined,
  predicate: (value: T, index: number, array: T[]) => boolean
): T[] {
  const length = array == null ? 0 : array.length;
  let resultIndex = 0;
  let currentIndex = -1;
  const result: T[] = [];

  while (++currentIndex < length) {
    const currentValue = array[currentIndex];
    if (predicate(currentValue, currentIndex, array)) {
      result[resultIndex++] = currentValue;
    }
  }

  return result;
}