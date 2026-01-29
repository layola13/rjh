type ArrayLike<T> = {
  length: number;
  [index: number]: T;
};

type IteratorCallback<T, R> = (value: T, index: number, collection: T[]) => R;

function baseMap<T, R>(
  collection: ArrayLike<T> | T[],
  iteratee: IteratorCallback<T, R>
): R[] {
  let index = -1;
  const result: R[] = isArrayLike(collection) ? Array(collection.length) : [];
  
  baseEach(collection, (value: T, key: number, coll: T[]) => {
    result[++index] = iteratee(value, key, coll);
  });
  
  return result;
}

function isArrayLike<T>(value: ArrayLike<T> | T[]): value is ArrayLike<T> {
  return value != null && typeof value.length === 'number';
}

function baseEach<T>(
  collection: ArrayLike<T> | T[],
  iteratee: (value: T, index: number, collection: T[]) => void
): void {
  // Implementation would be imported from module 9646
  // This is a placeholder for the actual baseEach logic
}

export default baseMap;