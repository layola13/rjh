interface IterationResult<T = unknown> {
  stopped: boolean;
  result: T;
}

class IterationResultImpl<T = unknown> implements IterationResult<T> {
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

interface IterableRecord<T = unknown> {
  iterator: Iterator<T>;
  next: () => IteratorResult<T>;
}

type IterableInput<T> = 
  | IterableRecord<T>
  | Iterator<T>
  | Iterable<T>;

export function iterate<T, R>(
  input: IterableInput<T>,
  callback: (value: T, stop: (result: R) => IterationResult<R>) => R | void,
  options?: IterateOptions<T, R>
): IterationResult<R | undefined> {
  
  const callbackContext = options?.context;
  const asEntries = options?.AS_ENTRIES ?? false;
  const isRecord = options?.IS_RECORD ?? false;
  const isIterator = options?.IS_ITERATOR ?? false;
  const interrupted = options?.INTERRUPTED ?? false;

  const boundCallback = callbackContext 
    ? callback.bind(callbackContext) 
    : callback;

  const createStopResult = (result: R): IterationResult<R> => {
    if (iterator) {
      closeIterator(iterator, "normal", result);
    }
    return new IterationResultImpl(true, result);
  };

  const processValue = (value: T): IterationResult<R | undefined> | R | void => {
    if (asEntries) {
      validateObject(value);
      const entry = value as unknown as [unknown, unknown];
      return interrupted 
        ? boundCallback(entry[0], entry[1], createStopResult) 
        : boundCallback(entry[0], entry[1]);
    }
    return interrupted 
      ? boundCallback(value, createStopResult) 
      : boundCallback(value);
  };

  let iterator: Iterator<T> | undefined;

  if (isRecord) {
    iterator = (input as IterableRecord<T>).iterator;
  } else if (isIterator) {
    iterator = input as Iterator<T>;
  } else {
    const iteratorMethod = getIteratorMethod(input);
    if (!iteratorMethod) {
      throw new TypeError(`${describeValue(input)} is not iterable`);
    }

    if (isArrayIteratorMethod(iteratorMethod)) {
      const array = input as unknown as ArrayLike<T>;
      const length = getLength(array);
      
      for (let index = 0; index < length; index++) {
        const result = processValue(array[index]);
        if (result && isIterationResult(result)) {
          return result;
        }
      }
      return new IterationResultImpl(false, undefined);
    }

    iterator = createIterator(input, iteratorMethod);
  }

  const next = isRecord 
    ? (input as IterableRecord<T>).next 
    : iterator!.next;

  let iteratorResult: IteratorResult<T>;
  
  while (!(iteratorResult = callFunction(next, iterator)).done) {
    let processResult: IterationResult<R | undefined> | R | void;
    
    try {
      processResult = processValue(iteratorResult.value);
    } catch (error) {
      closeIterator(iterator, "throw", error);
    }

    if (typeof processResult === "object" && processResult && isIterationResult(processResult)) {
      return processResult;
    }
  }

  return new IterationResultImpl(false, undefined);
}

function validateObject(value: unknown): asserts value is object {
  if (typeof value !== "object" || value === null) {
    throw new TypeError("Value must be an object");
  }
}

function getIteratorMethod<T>(input: unknown): (() => Iterator<T>) | undefined {
  // Implementation depends on imported function
  return undefined;
}

function isArrayIteratorMethod(method: unknown): boolean {
  // Implementation depends on imported function
  return false;
}

function getLength(arrayLike: ArrayLike<unknown>): number {
  // Implementation depends on imported function
  return arrayLike.length;
}

function createIterator<T>(input: unknown, method: () => Iterator<T>): Iterator<T> {
  // Implementation depends on imported function
  return method.call(input);
}

function closeIterator(iterator: Iterator<unknown> | undefined, type: "normal" | "throw", value?: unknown): void {
  // Implementation depends on imported function
}

function isIterationResult<T>(value: unknown): value is IterationResult<T> {
  return value instanceof IterationResultImpl;
}

function callFunction<T, R>(func: (...args: unknown[]) => R, context: T, ...args: unknown[]): R {
  return func.apply(context, args);
}

function describeValue(value: unknown): string {
  // Implementation depends on imported function
  return String(value);
}