function* keys<T>(obj: Record<string, T>): Generator<T, void, unknown> {
  const keysArray: T[] = [];
  
  for (const property in obj) {
    if (obj.hasOwnProperty(property)) {
      keysArray.push(obj[property]);
    }
  }
  
  yield* keysArray;
}