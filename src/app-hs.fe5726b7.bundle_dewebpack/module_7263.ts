type ObjectConstructor = new (...args: any[]) => any;

interface Collection<T> {
  [key: string]: T;
  [key: number]: T;
}

type Iteratee<T, TResult> = (
  accumulator: TResult,
  value: T,
  indexOrKey: number | string,
  collection: Collection<T>
) => TResult;

function transform<T, TResult>(
  collection: Collection<T> | T[],
  iteratee: Iteratee<T, TResult>,
  accumulator?: TResult
): TResult {
  const isArray = Array.isArray(collection);
  const isTypedArray = isTypedArrayLike(collection);
  const isArrayLike = isArray || isTypedArray || isArgumentsObject(collection);

  const transformedIteratee = createIteratee(iteratee, 4);

  if (accumulator == null) {
    const constructor = collection?.constructor as ObjectConstructor | undefined;
    
    if (isArrayLike) {
      accumulator = (isArray ? new constructor() : []) as TResult;
    } else if (isObject(collection) && isFunction(constructor)) {
      accumulator = createPrototypeObject(getPrototype(collection)) as TResult;
    } else {
      accumulator = {} as TResult;
    }
  }

  const iteratorFunction = isArrayLike ? arrayEach : baseForOwn;
  
  iteratorFunction(collection, (value: T, key: number | string, coll: Collection<T>) => {
    return transformedIteratee(accumulator!, value, key, coll);
  });

  return accumulator;
}

// Utility type guards and helpers
function isTypedArrayLike(value: unknown): boolean {
  // Implementation would check for TypedArray types
  return false;
}

function isArgumentsObject(value: unknown): boolean {
  // Implementation would check for arguments object
  return false;
}

function createIteratee<T, TResult>(
  func: Iteratee<T, TResult>,
  arity: number
): Iteratee<T, TResult> {
  // Implementation would create iteratee function
  return func;
}

function isObject(value: unknown): value is object {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}

function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

function getPrototype(value: object): object | null {
  return Object.getPrototypeOf(value);
}

function createPrototypeObject(proto: object | null): object {
  return Object.create(proto);
}

function arrayEach<T>(
  array: Collection<T>,
  iteratee: (value: T, index: number | string, collection: Collection<T>) => any
): void {
  // Implementation would iterate over array
}

function baseForOwn<T>(
  object: Collection<T>,
  iteratee: (value: T, key: string, collection: Collection<T>) => any
): void {
  // Implementation would iterate over object properties
}

export default transform;