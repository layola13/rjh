function findIndex<T>(
  array: T[],
  predicate: (value: T, index: number, arr: T[]) => boolean,
  startIndex: number,
  fromRight: boolean
): number {
  const length = array.length;
  let index = startIndex + (fromRight ? 1 : -1);
  
  while (fromRight ? index-- : ++index < length) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  
  return -1;
}

export default findIndex;