function indexOf<T>(array: T[], value: T, fromIndex: number): number {
  const length = array?.length ?? 0;
  if (!length) {
    return -1;
  }

  let index = fromIndex;
  if (index < 0) {
    index = Math.max(length + index, 0);
  }

  for (let i = index; i < length; i++) {
    if (array[i] === value) {
      return i;
    }
  }

  return -1;
}

export function includes<T>(array: T[] | null | undefined, value: T): boolean {
  return !(array == null || !array.length) && indexOf(array, value, 0) > -1;
}