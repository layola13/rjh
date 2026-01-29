import clear from './module_7040';
import deleteMethod from './module_4125';
import get from './module_2117';
import has from './module_7518';
import set from './module_4705';

class MapCache<K = any, V = any> {
  constructor(entries?: ReadonlyArray<readonly [K, V]> | null) {
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
    clear.call(this);
  }

  delete(key: K): boolean {
    return deleteMethod.call(this, key);
  }

  get(key: K): V | undefined {
    return get.call(this, key);
  }

  has(key: K): boolean {
    return has.call(this, key);
  }

  set(key: K, value: V): this {
    set.call(this, key, value);
    return this;
  }
}

export default MapCache;