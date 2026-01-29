function listCacheDelete<T>(key: T): boolean {
  const data = this.__data__ as Array<[T, unknown]>;
  const index = findIndex(data, key);

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

function findIndex<T>(array: Array<[T, unknown]>, key: T): number {
  const length = array.length;
  
  for (let i = 0; i < length; i++) {
    if (array[i][0] === key) {
      return i;
    }
  }
  
  return -1;
}

export default listCacheDelete;