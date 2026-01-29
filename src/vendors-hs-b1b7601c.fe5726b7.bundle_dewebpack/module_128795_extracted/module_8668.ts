class SetCache<T> {
  private __data__: Map<T, T>;

  constructor(values?: T[]) {
    this.__data__ = new Map();
    
    if (values) {
      for (const value of values) {
        this.add(value);
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