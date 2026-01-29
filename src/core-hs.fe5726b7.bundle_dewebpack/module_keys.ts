interface IteratorResult<T> {
  done: boolean;
  value?: T;
}

interface Iterator<T> {
  next(): IteratorResult<T>;
}

function createEmptyIterator<T>(): Iterator<T> {
  return {
    next(): IteratorResult<T> {
      return {
        done: true
      };
    }
  };
}

export { createEmptyIterator, Iterator, IteratorResult };