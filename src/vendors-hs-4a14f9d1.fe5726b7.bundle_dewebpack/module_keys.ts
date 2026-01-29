function getKeys<T>(): Iterator<T> {
  const keys: T[] = [];
  
  for (const key in this.h.__keys__) {
    if (this.h.hasOwnProperty(key)) {
      keys.push(this.h.__keys__[key]);
    }
  }
  
  return C.iter(keys);
}