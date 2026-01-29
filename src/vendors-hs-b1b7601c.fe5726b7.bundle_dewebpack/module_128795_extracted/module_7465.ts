class DataContainer {
  __data__: Map<unknown, unknown>;
  size: number;

  constructor() {
    this.__data__ = new Map();
    this.size = 0;
  }
}

export default DataContainer;