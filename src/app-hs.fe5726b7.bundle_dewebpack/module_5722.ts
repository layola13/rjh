function isNaN(value: unknown): boolean {
  return value !== value;
}

function findIndex<T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => boolean,
  fromIndex?: number
): number {
  const length = array.length;
  let index = fromIndex ?? 0;

  if (index < 0) {
    index = Math.max(length + index, 0);
  }

  while (index < length) {
    if (predicate(array[index], index, array)) {
      return index;
    }
    index++;
  }

  return -1;
}

function strictIndexOf<T>(array: T[], value: T, fromIndex?: number): number {
  const length = array.length;
  let index = (fromIndex ?? 0) - 1;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }

  return -1;
}

export function baseIndexOf<T>(
  array: T[],
  value: T,
  fromIndex?: number
): number {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : findIndex(array, isNaN, fromIndex);
}