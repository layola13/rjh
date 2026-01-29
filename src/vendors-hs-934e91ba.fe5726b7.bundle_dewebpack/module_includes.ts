function includes<T>(this: Set<T> | Map<T, unknown>, value: T): boolean {
  return this.has(value);
}