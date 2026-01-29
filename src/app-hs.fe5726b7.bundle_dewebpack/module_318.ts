export class HashMap<K, V> {
  private data: Map<K, V>;

  constructor(entries?: Array<[K, V]> | null) {
    this.data = new Map();
    
    if (entries) {
      for (const [key, value] of entries) {
        this.set(key, value);
      }
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