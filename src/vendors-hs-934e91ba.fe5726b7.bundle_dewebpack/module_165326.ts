interface StackLike {
  __data__: unknown[];
  size: number;
}

interface MapLike {
  set(key: unknown, value: unknown): void;
  size: number;
}

interface DataContainer {
  __data__: unknown[];
  size: number;
}

class ListCache {
  __data__: Array<[unknown, unknown]>;
  size: number;

  constructor(entries?: Array<[unknown, unknown]>) {
    this.__data__ = entries || [];
    this.size = this.__data__.length;
  }

  push(entry: [unknown, unknown]): void {
    this.__data__.push(entry);
    this.size = this.__data__.length;
  }
}

class MapCache {
  __data__: Map<unknown, unknown>;
  size: number;

  constructor(entries?: Array<[unknown, unknown]>) {
    this.__data__ = new Map(entries);
    this.size = this.__data__.size;
  }

  set(key: unknown, value: unknown): this {
    this.__data__.set(key, value);
    this.size = this.__data__.size;
    return this;
  }
}

const LARGE_ARRAY_SIZE = 199;

function stackSet<K, V>(this: any, key: K, value: V): any {
  let data = this.__data__;

  if (data instanceof ListCache) {
    const pairs = data.__data__;
    
    if (!Map || pairs.length < LARGE_ARRAY_SIZE) {
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