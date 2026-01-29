function assocIndexOf<T>(array: Array<[T, unknown]>, key: T): number {
  const length = array.length;
  for (let i = 0; i < length; i++) {
    if (array[i][0] === key) {
      return i;
    }
  }
  return -1;
}

interface ListCache<K = unknown, V = unknown> {
  __data__: Array<[K, V]>;
  size: number;
}

function listCacheSet<K, V>(this: ListCache<K, V>, key: K, value: V): ListCache<K, V> {
  const data = this.__data__;
  const index = assocIndexOf(data, key);
  
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  
  return this;
}

export default listCacheSet;