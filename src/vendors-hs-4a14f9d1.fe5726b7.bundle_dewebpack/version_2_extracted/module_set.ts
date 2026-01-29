interface SetItem<T> {
  __id__?: number;
}

class ModuleSet<T extends SetItem<T>> {
  private h: Record<number, unknown> = {};
  
  constructor() {
    if (!this.h.__keys__) {
      this.h.__keys__ = {};
    }
  }

  add(item: T, value: unknown): void {
    const id = item.__id__ ?? (item.__id__ = ++globalIdCounter.count);
    this.h[id] = value;
    this.h.__keys__[id] = item;
  }
}

const globalIdCounter = {
  count: 0
};