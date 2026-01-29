export function get<K, V>(this: Map<K, V>, key: K): V | undefined {
  return this.__data__.get(key);
}