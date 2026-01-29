interface Iterator<T> {
  forEach(callbackFn: (value: T, index: number) => void): void;
}

export function forEachIterator<T>(
  iterator: Iterator<T>,
  callbackFn: (value: T, index: number) => void
): void {
  const iteratorRecord = toIteratorRecord(iterator);
  let index = 0;
  
  validateCallable(callbackFn);
  
  iterateIterator(iteratorRecord, (value: T) => {
    callbackFn(value, index++);
  }, {
    IS_RECORD: true
  });
}

function toIteratorRecord<T>(iterator: Iterator<T>): Iterator<T> {
  // Convert iterator to iterator record
  return iterator;
}

function validateCallable(fn: unknown): asserts fn is Function {
  if (typeof fn !== 'function') {
    throw new TypeError('Callback must be callable');
  }
}

function iterateIterator<T>(
  iterator: Iterator<T>,
  callback: (value: T) => void,
  options: { IS_RECORD: boolean }
): void {
  // Iterate through iterator and execute callback
  let result = iterator.next();
  while (!result.done) {
    callback(result.value);
    result = iterator.next();
  }
}