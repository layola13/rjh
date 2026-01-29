class DataContainer {
  size: number;
  __data__: {
    hash: Map<string, unknown>;
    map: Map<unknown, unknown>;
    string: Map<string, unknown>;
  };

  constructor() {
    this.size = 0;
    this.__data__ = {
      hash: new Map<string, unknown>(),
      map: new Map<unknown, unknown>(),
      string: new Map<string, unknown>()
    };
  }
}

export default DataContainer;