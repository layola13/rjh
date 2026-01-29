class Stack<T = unknown> {
  private __data__: ListCache<T>;
  public size: number;

  constructor(entries?: ReadonlyArray<[string, T]>) {
    this.__data__ = new ListCache<T>(entries);
    this.size = this.__data__.size;
  }

  clear(): void {
    this.__data__ = new ListCache<T>();
    this.size = 0;
  }

  delete(key: string): boolean {
    const result = this.__data__.delete(key);
    this.size = this.__data__.size;
    return result;
  }

  get(key: string): T | undefined {
    return this.__data__.get(key);
  }

  has(key: string): boolean {
    return this.__data__.has(key);
  }

  set(key: string, value: T): this {
    const data = this.__data__;
    if (data instanceof ListCache) {
      const pairs = data.entries();
      if (pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      this.__data__ = new MapCache<T>(pairs);
    }
    this.__data__.set(key, value);
    this.size = this.__data__.size;
    return this;
  }
}

interface CacheInterface<T> {
  size: number;
  clear(): void;
  delete(key: string): boolean;
  get(key: string): T | undefined;
  has(key: string): boolean;
  set(key: string, value: T): void;
  entries(): Array<[string, T]>;
}

class ListCache<T> implements CacheInterface<T> {
  public size: number = 0;
  private data: Array<[string, T]> = [];

  constructor(entries?: ReadonlyArray<[string, T]>) {
    if (entries) {
      this.data = [...entries];
      this.size = entries.length;
    }
  }

  clear(): void {
    this.data = [];
    this.size = 0;
  }

  delete(key: string): boolean {
    const index = this.data.findIndex(([k]) => k === key);
    if (index > -1) {
      this.data.splice(index, 1);
      this.size--;
      return true;
    }
    return false;
  }

  get(key: string): T | undefined {
    const entry = this.data.find(([k]) => k === key);
    return entry?.[1];
  }

  has(key: string): boolean {
    return this.data.some(([k]) => k === key);
  }

  set(key: string, value: T): void {
    const index = this.data.findIndex(([k]) => k === key);
    if (index > -1) {
      this.data[index][1] = value;
    } else {
      this.data.push([key, value]);
      this.size++;
    }
  }

  entries(): Array<[string, T]> {
    return this.data;
  }
}

class MapCache<T> implements CacheInterface<T> {
  private map: Map<string, T>;
  public size: number;

  constructor(entries?: ReadonlyArray<[string, T]>) {
    this.map = new Map(entries);
    this.size = this.map.size;
  }

  clear(): void {
    this.map.clear();
    this.size = 0;
  }

  delete(key: string): boolean {
    const result = this.map.delete(key);
    this.size = this.map.size;
    return result;
  }

  get(key: string): T | undefined {
    return this.map.get(key);
  }

  has(key: string): boolean {
    return this.map.has(key);
  }

  set(key: string, value: T): void {
    this.map.set(key, value);
    this.size = this.map.size;
  }

  entries(): Array<[string, T]> {
    return Array.from(this.map.entries());
  }
}

const LARGE_ARRAY_SIZE = 200;

export default Stack;