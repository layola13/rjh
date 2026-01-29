interface DataContainer {
  __data__: ListCache | MapCache;
  size: number;
}

interface ListCache {
  __data__: Array<[unknown, unknown]>;
  size: number;
}

interface MapCache {
  set(key: unknown, value: unknown): void;
  size: number;
}

const LARGE_ARRAY_SIZE = 199;

function stackSet<K, V>(this: DataContainer, key: K, value: V): DataContainer {
  let data = this.__data__;
  
  if (data instanceof ListCache) {
    const pairs = data.__data__;
    
    if (!MapCache || pairs.length < LARGE_ARRAY_SIZE) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    
    data = this.__data__ = new MapCache(pairs);
  }
  
  data.set(key, value);
  this.size = data.size;
  return this;
}

export default stackSet;