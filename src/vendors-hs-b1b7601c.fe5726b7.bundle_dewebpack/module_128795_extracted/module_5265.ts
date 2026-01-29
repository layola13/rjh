interface MapLike<K, V> {
  size: number;
  set(key: K, value: V): this;
}

function mapSet<K, V>(this: MapLike<K, V>, key: K, value: V): MapLike<K, V> {
  const entry = getMapEntry(this, key);
  const previousSize = entry.size;
  
  entry.set(key, value);
  this.size += entry.size === previousSize ? 0 : 1;
  
  return this;
}

function getMapEntry<K, V>(map: MapLike<K, V>, key: K): { size: number; set(key: K, value: V): void } {
  // Implementation depends on module 5050
  throw new Error('getMapEntry implementation required');
}

export default mapSet;