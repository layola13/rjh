export function filter<T>(
  array: T[] | null | undefined,
  predicate: (value: T, index: number, array: T[]) => boolean
): T[] {
  const length = array == null ? 0 : array.length;
  let resultIndex = 0;
  let index = -1;
  const result: T[] = [];

  while (++index < length) {
    const value = array![index];
    if (predicate(value, index, array!)) {
      result[resultIndex++] = value;
    }
  }

  return result;
}