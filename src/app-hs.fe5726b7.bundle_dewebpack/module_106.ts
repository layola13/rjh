interface DataStructure {
  __data__: Array<[unknown, unknown]>;
  length: number;
  push(item: [unknown, unknown]): number;
  set(key: unknown, value: unknown): void;
  size: number;
}

interface CacheInstance {
  __data__: DataStructure;
  size: number;
}

function stackSet<K, V>(this: CacheInstance, key: K, value: V): CacheInstance {
  let data = this.__data__;
  
  if (isListCache(data)) {
    const internalData = data.__data__;
    
    if (!hasMapSupport || internalData.length < 199) {
      internalData.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    
    data = this.__data__ = createMapCache(internalData);
  }
  
  data.set(key, value);
  this.size = data.size;
  return this;
}

function isListCache(data: DataStructure): data is DataStructure {
  return Array.isArray(data.__data__);
}

function createMapCache(items: Array<[unknown, unknown]>): DataStructure {
  const cache = {} as DataStructure;
  cache.__data__ = items;
  cache.size = items.length;
  return cache;
}

const hasMapSupport = typeof Map !== 'undefined';

const LARGE_ARRAY_SIZE = 199;

export default stackSet;