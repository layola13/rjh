function reduce<T, R>(
  array: T[],
  iteratee: (accumulator: R, value: T, index: number, arr: T[]) => R,
  accumulator: R,
  initAccum: boolean
): R {
  let index = -1;
  const length = array == null ? 0 : array.length;

  if (initAccum && length) {
    accumulator = array[++index] as unknown as R;
  }

  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }

  return accumulator;
}

export default reduce;