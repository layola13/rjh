interface KeyValuePair<K, V> {
  0: K;
  1: V;
}

interface ListCache<K = any, V = any> {
  __data__: KeyValuePair<K, V>[];
  size: number;
}

function assocIndexOf<K>(array: KeyValuePair<K, any>[], key: K): number {
  const length = array.length;
  for (let i = 0; i < length; i++) {
    if (array[i][0] === key) {
      return i;
    }
  }
  return -1;
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