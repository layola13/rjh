export default function reduce<T, R>(
  collection: T[],
  iteratee: (accumulator: R, value: T, index: number, collection: T[]) => R,
  accumulator: R,
  initFromCollection: boolean,
  baseIteratee: (collection: T[], callback: (value: T, index: number, collection: T[]) => void) => void
): R {
  let result = accumulator;
  let initialized = initFromCollection;

  baseIteratee(collection, (value: T, index: number, coll: T[]) => {
    if (initialized) {
      initialized = false;
      result = value as unknown as R;
    } else {
      result = iteratee(result, value, index, coll);
    }
  });

  return result;
}