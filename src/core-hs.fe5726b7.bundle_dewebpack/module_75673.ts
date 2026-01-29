function toSet<T>(collection: Iterable<T>): Set<T> {
  const resultSet = new Set<T>();
  
  forEach(collection, (item: T) => {
    resultSet.add(item);
  });
  
  return resultSet;
}

function forEach<T>(collection: Iterable<T>, callback: (item: T) => void): void {
  for (const item of collection) {
    callback(item);
  }
}

export { toSet };