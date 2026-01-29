function map<T, U>(
  array: T[],
  iteratee: (value: T, index: number, array: T[]) => U
): U[];

function map<T extends object, U>(
  object: T,
  iteratee: (value: T[keyof T], key: keyof T, object: T) => U
): U[];

function map<T, U>(
  collection: T[] | object,
  iteratee: (value: any, indexOrKey: any, collection: any) => U
): U[] {
  const isArr = Array.isArray(collection);
  
  if (isArr) {
    return arrayMap(collection as any[], iteratee);
  } else {
    return baseMap(collection as object, iteratee);
  }
}

function arrayMap<T, U>(
  array: T[],
  iteratee: (value: T, index: number, array: T[]) => U
): U[] {
  let index = -1;
  const length = array.length;
  const result: U[] = new Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

function baseMap<T extends object, U>(
  collection: T,
  iteratee: (value: T[keyof T], key: keyof T, collection: T) => U
): U[] {
  const result: U[] = [];
  
  for (const key in collection) {
    if (Object.prototype.hasOwnProperty.call(collection, key)) {
      result.push(iteratee(collection[key], key, collection));
    }
  }
  
  return result;
}

function baseIteratee<T>(func: T): T {
  return func;
}

export default map;