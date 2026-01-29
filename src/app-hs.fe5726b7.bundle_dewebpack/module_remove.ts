function remove<T>(this: Collection<T>): Collection<T> {
  this.each((element: T, index: number) => {
    if (element && typeof element === 'object' && 'remove' in element) {
      const removable = element as unknown as { remove(): void };
      removable.remove();
    }
  });
  
  return this.clear();
}

interface Collection<T> {
  each(callback: (element: T, index: number) => void): Collection<T>;
  clear(): Collection<T>;
  remove(): Collection<T>;
}