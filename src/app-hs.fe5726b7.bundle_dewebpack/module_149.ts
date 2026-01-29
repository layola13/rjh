function reduce<T, U>(
  collection: T[] | Record<string, T>,
  iteratee: (accumulator: U, value: T, index: number | string, collection: T[] | Record<string, T>) => U,
  accumulator?: U
): U {
  const isArr = Array.isArray(collection);
  const reduceFn = isArr ? arrayReduce : baseReduce;
  const hasInitialValue = arguments.length >= 3;
  
  return reduceFn(
    collection,
    createBaseIteratee(iteratee, 4),
    accumulator,
    hasInitialValue,
    baseEach
  );
}

function arrayReduce<T, U>(
  array: T[],
  iteratee: (accumulator: U, value: T, index: number, array: T[]) => U,
  accumulator: U,
  initAccum: boolean
): U {
  let index = -1;
  const length = array.length;
  
  if (initAccum && length) {
    accumulator = array[++index] as unknown as U;
  }
  
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  
  return accumulator;
}

function baseReduce<T, U>(
  collection: Record<string, T>,
  iteratee: (accumulator: U, value: T, key: string, collection: Record<string, T>) => U,
  accumulator: U,
  initAccum: boolean,
  eachFunc: (collection: Record<string, T>, iteratee: (value: T, key: string) => void) => Record<string, T>
): U {
  eachFunc(collection, (value: T, key: string) => {
    accumulator = iteratee(accumulator, value, key, collection);
  });
  
  return accumulator;
}

function createBaseIteratee<T, U>(
  func: (accumulator: U, value: T, index: number | string, collection: T[] | Record<string, T>) => U,
  arity: number
): (accumulator: U, value: T, index: number | string, collection: T[] | Record<string, T>) => U {
  return func;
}

function baseEach<T>(
  collection: Record<string, T>,
  iteratee: (value: T, key: string) => void
): Record<string, T> {
  for (const key in collection) {
    if (collection.hasOwnProperty(key)) {
      iteratee(collection[key], key);
    }
  }
  return collection;
}

export default reduce;