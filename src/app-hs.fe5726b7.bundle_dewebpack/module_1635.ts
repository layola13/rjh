export function map<T, U>(
  array: T[] | null | undefined,
  iteratee: (value: T, index: number, array: T[]) => U
): U[] {
  let index = -1;
  const length = array == null ? 0 : array.length;
  const result = Array<U>(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }

  return result;
}