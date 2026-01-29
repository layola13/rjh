export function has<K>(key: K): boolean {
  return this.__data__.has(key);
}