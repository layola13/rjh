function assocIndexOf<T>(array: Array<[T, any]>, key: T): number {
  let index = -1;
  const length = array.length;
  
  while (++index < length) {
    if (array[index][0] === key) {
      return index;
    }
  }
  
  return -1;
}

interface ListCache<K = any, V = any> {
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