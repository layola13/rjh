interface IteratorResultValue<T> {
  done: boolean;
  value: T;
}

interface MapIteratorState<T, U> {
  iterator: Iterator<T>;
  mapper: (value: T, index: number) => U;
  next: () => IteratorResultValue<T>;
  done: boolean;
  counter: number;
}

/**
 * Creates a mapped iterator that transforms each value using the provided mapper function.
 * @param mapper - Function to transform each value with its index
 * @returns A new iterator that yields mapped values
 */
function createMapIterator<T, U>(
  this: Iterable<T>,
  mapper: (value: T, index: number) => U
): Iterator<U> {
  const iterator = getIterator(this);
  
  const state: MapIteratorState<T, U> = {
    iterator,
    mapper: ensureCallable(mapper),
    next: iterator.next.bind(iterator),
    done: false,
    counter: 0
  };

  return createIteratorHelper(function(this: MapIteratorState<T, U>) {
    const iterator = this.iterator;
    const result = requireObject(call(this.next, iterator));
    
    if (result.done) {
      this.done = true;
      return undefined;
    }
    
    return callWithMapper(iterator, this.mapper, [result.value, this.counter++], true);
  }.bind(state));
}

/**
 * Ensures the provided value is callable (a function).
 */
function ensureCallable<T extends (...args: any[]) => any>(fn: T): T {
  if (typeof fn !== 'function') {
    throw new TypeError('Mapper must be a function');
  }
  return fn;
}

/**
 * Gets an iterator from an iterable object.
 */
function getIterator<T>(iterable: Iterable<T>): Iterator<T> {
  if (iterable == null || typeof iterable[Symbol.iterator] !== 'function') {
    throw new TypeError('Value is not iterable');
  }
  return iterable[Symbol.iterator]();
}

/**
 * Ensures the value is an object.
 */
function requireObject<T>(value: T): T {
  if (value == null || typeof value !== 'object') {
    throw new TypeError('Expected an object');
  }
  return value;
}

/**
 * Calls a function with the given context.
 */
function call<T, A extends any[], R>(
  fn: (this: T, ...args: A) => R,
  context: T,
  ...args: A
): R {
  return fn.apply(context, args);
}

/**
 * Calls the mapper function with the provided arguments.
 */
function callWithMapper<T, U>(
  iterator: Iterator<T>,
  mapper: (value: T, index: number) => U,
  args: [T, number],
  shouldCall: boolean
): U | undefined {
  if (!shouldCall) return undefined;
  return mapper(args[0], args[1]);
}

/**
 * Creates an iterator helper with the provided generator function.
 */
function createIteratorHelper<T>(
  generatorFn: () => T | undefined
): Iterator<T> {
  return {
    next(): IteratorResult<T> {
      const value = generatorFn();
      return value === undefined
        ? { done: true, value: undefined as any }
        : { done: false, value };
    }
  };
}

export default createMapIterator;