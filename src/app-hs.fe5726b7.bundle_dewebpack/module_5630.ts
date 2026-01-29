interface MapEntry<K, V> {
  0: K;
  1: V;
}

class CustomMap<K = unknown, V = unknown> {
  private data: Map<K, V>;

  constructor(entries?: ArrayLike<MapEntry<K, V>> | null) {
    this.data = new Map();
    this.clear();

    if (entries == null) {
      return;
    }

    const length = entries.length;
    for (let index = 0; index < length; index++) {
      const entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  clear(): void {
    this.data.clear();
  }

  delete(key: K): boolean {
    return this.data.delete(key);
  }

  get(key: K): V | undefined {
    return this.data.get(key);
  }

  has(key: K): boolean {
    return this.data.has(key);
  }

  set(key: K, value: V): this {
    this.data.set(key, value);
    return this;
  }
}

export default CustomMap;