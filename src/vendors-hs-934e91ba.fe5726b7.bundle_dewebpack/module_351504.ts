export function has<T>(collection: Map<T, any> | Set<T> | WeakMap<object, any> | WeakSet<object>, key: T): boolean {
  return collection.has(key);
}