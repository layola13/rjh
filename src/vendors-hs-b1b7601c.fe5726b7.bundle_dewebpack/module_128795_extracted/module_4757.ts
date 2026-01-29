export function has<T>(collection: Set<T> | Map<T, unknown>, item: T): boolean {
  return collection.has(item);
}