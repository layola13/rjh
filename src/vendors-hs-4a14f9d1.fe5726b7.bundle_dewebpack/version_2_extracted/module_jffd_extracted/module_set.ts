interface MapWithKeys<K, V> {
  [key: number]: V;
  __keys__: {
    [key: number]: K;
  };
}

interface Identifiable {
  __id__?: number;
}

let globalIdCounter = 0;

function set<K extends Identifiable, V>(key: K, value: V, storage: MapWithKeys<K, V>): void {
  const id = key.__id__ ?? (key.__id__ = ++globalIdCounter);
  storage[id] = value;
  storage.__keys__[id] = key;
}