function filter<T>(
  collection: T[],
  predicate: (value: T, index: number, array: T[]) => boolean
): T[] {
  const result: T[] = [];
  
  forEach(collection, (value: T, index: number, array: T[]) => {
    if (predicate(value, index, array)) {
      result.push(value);
    }
  });
  
  return result;
}

export default filter;

function forEach<T>(
  collection: T[],
  callback: (value: T, index: number, array: T[]) => void
): void {
  for (let index = 0; index < collection.length; index++) {
    callback(collection[index], index, collection);
  }
}