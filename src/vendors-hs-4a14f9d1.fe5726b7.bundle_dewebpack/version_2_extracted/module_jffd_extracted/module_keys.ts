function* keys<K>(): Generator<K, void, undefined> {
  const keysArray: K[] = [];
  
  for (const property in this.h.__keys__) {
    if (this.h.hasOwnProperty(property)) {
      keysArray.push(this.h.__keys__[property]);
    }
  }
  
  yield* keysArray;
}