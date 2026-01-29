interface IteratorResult<T> {
  done: boolean;
  value: T;
}

interface IteratorLike<T> {
  next(): IteratorResult<T>;
}

type PredicateFunction<T> = (value: T, index: number) => boolean;

interface FilterIteratorOptions<T> {
  predicate: PredicateFunction<T>;
}

class FilterIterator<T> {
  private iterator: IteratorLike<T>;
  private predicate: PredicateFunction<T>;
  private counter: number = 0;
  public done: boolean = false;

  constructor(iterator: IteratorLike<T>, options: FilterIteratorOptions<T>) {
    this.iterator = iterator;
    this.predicate = options.predicate;
  }

  public next(): T | undefined {
    while (true) {
      const result: IteratorResult<T> = this.iterator.next();
      this.done = result.done;

      if (this.done) {
        return undefined;
      }

      const value = result.value;

      if (this.predicate(value, this.counter++)) {
        return value;
      }
    }
  }
}

function requireIteratorInstance<T>(value: unknown): IteratorLike<T> {
  if (typeof value === 'object' && value !== null && 'next' in value) {
    return value as IteratorLike<T>;
  }
  throw new TypeError('Iterator instance required');
}

function aCallable<T extends Function>(fn: unknown): T {
  if (typeof fn !== 'function') {
    throw new TypeError('Function expected');
  }
  return fn as T;
}

declare global {
  interface Iterator<T> {
    filter(predicate: PredicateFunction<T>): FilterIterator<T>;
  }
}

Iterator.prototype.filter = function <T>(
  this: IteratorLike<T>,
  predicate: PredicateFunction<T>
): FilterIterator<T> {
  const validatedIterator = requireIteratorInstance<T>(this);
  const validatedPredicate = aCallable<PredicateFunction<T>>(predicate);

  return new FilterIterator<T>(validatedIterator, {
    predicate: validatedPredicate
  });
};

export {};