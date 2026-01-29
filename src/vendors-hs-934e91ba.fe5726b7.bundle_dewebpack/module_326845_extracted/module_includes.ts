function includes<T>(this: Set<T> | Map<T, unknown>, item: T): boolean {
  return this.has(item);
}