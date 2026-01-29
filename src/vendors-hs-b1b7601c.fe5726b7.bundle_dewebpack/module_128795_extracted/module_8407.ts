interface MapCacheEntry<K, V> {
  0: K;
  1: V;
}

class MapCache<K = any, V = any> {
  constructor(entries?: Array<MapCacheEntry<K, V>> | null) {
    const length = entries?.length ?? 0;
    let index = -1;

    this.clear();

    while (++index < length) {
      const entry = entries![index];
      this.set(entry[0], entry[1]);
    }
  }

  clear(): void {
    // Implementation from module 7040
    throw new Error('Method clear() must be implemented');
  }

  delete(key: K): boolean {
    // Implementation from module 4125
    throw new Error('Method delete() must be implemented');
  }

  get(key: K): V | undefined {
    // Implementation from module 2117
    throw new Error('Method get() must be implemented');
  }

  has(key: K): boolean {
    // Implementation from module 7518
    throw new Error('Method has() must be implemented');
  }

  set(key: K, value: V): this {
    // Implementation from module 4705
    throw new Error('Method set() must be implemented');
    return this;
  }
}

export default MapCache;