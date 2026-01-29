class HashSet<T> {
  private __data__: Map<T, string>;

  constructor() {
    this.__data__ = new Map<T, string>();
  }

  add(key: T): this {
    this.__data__.set(key, "__lodash_hash_undefined__");
    return this;
  }
}

export default function(key: unknown): HashSet<unknown> {
  return new HashSet<unknown>().add(key);
}