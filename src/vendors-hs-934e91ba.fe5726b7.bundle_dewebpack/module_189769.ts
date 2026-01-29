class DataStructure {
  size: number;
  __data__: {
    hash: HashTable;
    map: Map<unknown, unknown> | FallbackMap;
    string: HashTable;
  };

  constructor() {
    this.size = 0;
    this.__data__ = {
      hash: new HashTable(),
      map: new (Map || FallbackMap)(),
      string: new HashTable()
    };
  }
}

interface HashTable {
  // Define HashTable interface based on module 28122
}

interface FallbackMap {
  // Define FallbackMap interface based on module 110458
}

export default DataStructure;