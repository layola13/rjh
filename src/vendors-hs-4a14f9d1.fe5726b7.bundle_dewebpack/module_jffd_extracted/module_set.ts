interface SetItem<T> {
  __id__?: number;
}

interface SetStorage<T> {
  [key: string]: T;
  __keys__: Record<string, SetItem<T>>;
}

class ModuleSet<T> {
  private storage: SetStorage<T>;
  private static globalCount = 0;

  constructor() {
    this.storage = { __keys__: {} } as SetStorage<T>;
  }

  add(item: SetItem<T>, value: T): void {
    const itemId = item.__id__ ?? (item.__id__ = ++ModuleSet.globalCount);
    this.storage[itemId] = value;
    this.storage.__keys__[itemId] = item;
  }
}