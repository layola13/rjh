function incrementRefCount(index: number): void {
  if (index > 4) {
    ht[index].refcount += 1;
  }
}