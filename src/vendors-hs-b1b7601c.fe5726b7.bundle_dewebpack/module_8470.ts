function findIndex<T>(array: Array<[T, unknown]>, key: T): number {
  for (let index = array.length; index--;) {
    if (isEqual(array[index][0], key)) {
      return index;
    }
  }
  return -1;
}

function isEqual<T>(a: T, b: T): boolean {
  return a === b;
}

export default findIndex;