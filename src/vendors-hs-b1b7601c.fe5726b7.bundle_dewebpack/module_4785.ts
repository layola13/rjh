interface DataStore {
  hash: Map<string, any>;
  map: Map<any, any>;
  string: Map<string, any>;
}

class ListCache {
  size: number;
  __data__: DataStore;

  constructor() {
    this.size = 0;
    this.__data__ = {
      hash: new Map(),
      map: new Map(),
      string: new Map()
    };
  }
}

export default ListCache;