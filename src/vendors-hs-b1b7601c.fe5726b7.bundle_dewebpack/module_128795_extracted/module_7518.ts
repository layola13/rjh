function has(value: unknown): boolean {
  return baseIndexOf(this.__data__, value) > -1;
}

export default has;

interface Collection<T> {
  __data__: T[];
}

function baseIndexOf<T>(array: T[], value: T, fromIndex: number = 0): number {
  const length = array?.length ?? 0;
  
  if (!length) {
    return -1;
  }
  
  let index = fromIndex;
  if (index < 0) {
    index = Math.max(length + index, 0);
  }
  
  for (; index < length; index++) {
    if (array[index] === value) {
      return index;
    }
  }
  
  return -1;
}