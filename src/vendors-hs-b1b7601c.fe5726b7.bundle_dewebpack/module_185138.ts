interface SideChannel<K = any, V = any> {
  assert(key: K): void;
  delete(key: K): boolean;
  get(key: K): V | undefined;
  has(key: K): boolean;
  set(key: K, value: V): void;
}

export function createSideChannel<K = any, V = any>(): SideChannel<K, V> {
  let internalMap: Map<K, V> | undefined;

  const channel: SideChannel<K, V> = {
    assert(key: K): void {
      if (!channel.has(key)) {
        throw new TypeError(`Side channel does not contain ${String(key)}`);
      }
    },

    delete(key: K): boolean {
      if (internalMap) {
        const deleted = internalMap.delete(key);
        if (internalMap.size === 0) {
          internalMap = undefined;
        }
        return deleted;
      }
      return false;
    },

    get(key: K): V | undefined {
      return internalMap?.get(key);
    },

    has(key: K): boolean {
      return internalMap ? internalMap.has(key) : false;
    },

    set(key: K, value: V): void {
      if (!internalMap) {
        internalMap = new Map<K, V>();
      }
      internalMap.set(key, value);
    }
  };

  return channel;
}