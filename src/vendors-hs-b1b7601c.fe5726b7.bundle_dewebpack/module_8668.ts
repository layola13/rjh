class SetCache<T> {
  private __data__: Map<T, T>;

  constructor(values?: T[]) {
    this.__data__ = new Map();
    
    if (values != null) {
      const length = values.length;
      for (let index = 0; index < length; index++) {
        this.add(values[index]);
      }
    }
  }

  add(value: T): this {
    this.__data__.set(value, value);
    return this;
  }

  push(value: T): this {
    return this.add(value);
  }

  has(value: T): boolean {
    return this.__data__.has(value);
  }
}

export default SetCache;