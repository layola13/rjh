function set<K, V>(this: Map<K, V>, key: K, value: V): Map<K, V> {
  if (isObject(key) && !isPrimitive(key)) {
    const metadata = getMetadata(this);
    
    if (!metadata.frozen) {
      metadata.frozen = new WeakMap();
    }
    
    if (hasOwn(this, key)) {
      internalSet(this, key, value);
    } else {
      metadata.frozen.set(key, value);
    }
  } else {
    internalSet(this, key, value);
  }
  
  return this;
}

interface Metadata<K, V> {
  frozen?: WeakMap<K, V>;
}

function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null;
}

function isPrimitive(value: unknown): boolean {
  const type = typeof value;
  return value === null || (type !== 'object' && type !== 'function');
}

function getMetadata<K, V>(map: Map<K, V>): Metadata<K, V> {
  // Implementation depends on internal metadata storage
  return (map as any).__metadata__ ?? ((map as any).__metadata__ = {});
}

function hasOwn<K, V>(map: Map<K, V>, key: K): boolean {
  return map.has(key);
}

function internalSet<K, V>(map: Map<K, V>, key: K, value: V): void {
  map.set(key, value);
}