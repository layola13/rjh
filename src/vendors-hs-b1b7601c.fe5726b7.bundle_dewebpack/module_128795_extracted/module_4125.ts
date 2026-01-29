function listCacheDelete<T>(key: T): boolean {
  const data = this.__data__ as Array<[T, unknown]>;
  const index = baseIndexOf(data, key);

  if (index < 0) {
    return false;
  }

  const lastIndex = data.length - 1;
  
  if (index === lastIndex) {
    data.pop();
  } else {
    Array.prototype.splice.call(data, index, 1);
  }

  --this.size;
  return true;
}

function baseIndexOf<T>(array: Array<[T, unknown]>, value: T): number {
  let index = -1;
  const length = array.length;

  while (++index < length) {
    if (array[index][0] === value) {
      return index;
    }
  }

  return -1;
}

export default listCacheDelete;