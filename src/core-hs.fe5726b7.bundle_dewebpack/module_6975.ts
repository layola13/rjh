interface IterationResult<T> {
  stopped: boolean;
  result: T;
}

class StoppedIteration<T> implements IterationResult<T> {
  stopped: boolean;
  result: T;

  constructor(stopped: boolean, result: T) {
    this.stopped = stopped;
    this.result = result;
  }
}

interface IterateOptions<T, R> {
  that?: unknown;
  AS_ENTRIES?: boolean;
  IS_RECORD?: boolean;
  IS_ITERATOR?: boolean;
  INTERRUPTED?: boolean;
}

interface IterableRecord<T> {
  iterator: Iterator<T>;
  next: () => IteratorResult<T>;
}

type IteratorCallback<T, R> = (value: T, interrupt?: (result: R) => StoppedIteration<R>) => R;
type EntryCallback<K, V, R> = (key: K, value: V, interrupt?: (result: R) => StoppedIteration<R>) => R;

export default function iterate<T, R>(
  iterable: Iterable<T> | IterableRecord<T> | Iterator<T>,
  callback: IteratorCallback<T, R> | EntryCallback<unknown, unknown, R>,
  options?: IterateOptions<T, R>
): IterationResult<R | undefined> {
  const boundCallback = bind(callback, options?.that);
  const asEntries = options?.AS_ENTRIES ?? false;
  const isRecord = options?.IS_RECORD ?? false;
  const isIterator = options?.IS_ITERATOR ?? false;
  const interrupted = options?.INTERRUPTED ?? false;

  const createInterrupt = (result: R): StoppedIteration<R> => {
    if (iterator) {
      iteratorClose(iterator, "normal", result);
    }
    return new StoppedIteration(true, result);
  };

  const processValue = (value: T): R | StoppedIteration<R> => {
    if (asEntries) {
      assertObject(value);
      const entry = value as unknown as [unknown, unknown];
      return interrupted
        ? boundCallback(entry[0], entry[1], createInterrupt)
        : boundCallback(entry[0], entry[1]);
    }
    return interrupted
      ? boundCallback(value, createInterrupt)
      : boundCallback(value);
  };

  let iterator: Iterator<T> | undefined;
  let iteratorMethod: ((obj: Iterable<T>) => Iterator<T>) | undefined;

  if (isRecord) {
    iterator = (iterable as IterableRecord<T>).iterator;
  } else if (isIterator) {
    iterator = iterable as Iterator<T>;
  } else {
    iteratorMethod = getIteratorMethod(iterable as Iterable<T>);
    if (!iteratorMethod) {
      throw new TypeError(`${String(iterable)} is not iterable`);
    }

    if (isArrayIteratorMethod(iteratorMethod)) {
      const arrayLike = iterable as ArrayLike<T>;
      const length = getLength(arrayLike);
      for (let index = 0; index < length; index++) {
        const result = processValue(arrayLike[index]);
        if (result && isPrototypeOf(StoppedIteration.prototype, result)) {
          return result;
        }
      }
      return new StoppedIteration(false, undefined);
    }

    iterator = getIterator(iterable as Iterable<T>, iteratorMethod);
  }

  const next = isRecord ? (iterable as IterableRecord<T>).next : iterator!.next;

  let step: IteratorResult<T>;
  while (!(step = call(next, iterator)).done) {
    try {
      const result = processValue(step.value);
      if (typeof result === "object" && result && isPrototypeOf(StoppedIteration.prototype, result)) {
        return result as StoppedIteration<R>;
      }
    } catch (error) {
      iteratorClose(iterator, "throw", error);
    }
  }

  return new StoppedIteration(false, undefined);
}

// Import placeholders (these would be actual imports in the real codebase)
declare function bind<T extends Function>(fn: T, thisArg?: unknown): T;
declare function call<T>(fn: (...args: any[]) => T, thisArg: unknown, ...args: unknown[]): T;
declare function assertObject(value: unknown): asserts value is object;
declare function getString(value: unknown): string;
declare function isArrayIteratorMethod(method: unknown): boolean;
declare function getLength(arrayLike: ArrayLike<unknown>): number;
declare function isPrototypeOf(prototype: object, instance: unknown): boolean;
declare function getIteratorMethod<T>(iterable: Iterable<T>): ((obj: Iterable<T>) => Iterator<T>) | undefined;
declare function getIterator<T>(iterable: Iterable<T>, method: (obj: Iterable<T>) => Iterator<T>): Iterator<T>;
declare function iteratorClose(iterator: Iterator<unknown> | undefined, completion: string, value?: unknown): void;