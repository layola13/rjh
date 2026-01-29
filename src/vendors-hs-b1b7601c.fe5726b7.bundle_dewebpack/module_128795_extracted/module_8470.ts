function findIndex<T>(array: Array<[T, unknown]>, key: T): number {
  for (let index = array.length; index--;) {
    if (isEqual(array[index][0], key)) {
      return index;
    }
  }
  return -1;
}

function isEqual<T>(value: T, other: T): boolean {
  return value === other;
}

export default findIndex;