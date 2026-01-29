export function has<T>(collection: Set<T> | Map<T, unknown>, key: T): boolean {
  return collection.has(key);
}