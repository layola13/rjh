interface SetItem<K> {
  __id__?: number;
}

interface SetStorage<K, V> {
  [key: number]: V;
  __keys__: {
    [key: number]: K;
  };
}

class ModuleSet<K extends SetItem<K>, V> {
  private h: SetStorage<K, V>;

  constructor(storage: SetStorage<K, V>) {
    this.h = storage;
  }

  set(key: K, value: V): void {
    const id = key.__id__ ?? (key.__id__ = ++ModuleSet.count);
    this.h[id] = value;
    this.h.__keys__[id] = key;
  }

  private static count: number = 0;
}

export { ModuleSet, SetItem, SetStorage };