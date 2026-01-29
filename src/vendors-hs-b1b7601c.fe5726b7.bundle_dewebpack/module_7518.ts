function has(value: unknown): boolean {
  return baseIndexOf(this.__data__, value) > -1;
}

export default has;

interface HasContext {
  __data__: unknown[];
}

function baseIndexOf(array: unknown[], value: unknown): number {
  let index = -1;
  const length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}