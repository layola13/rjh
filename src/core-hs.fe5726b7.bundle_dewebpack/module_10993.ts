interface Iterator<T> {
  reduce<U>(
    callback: (accumulator: U, currentValue: T, currentIndex: number) => U,
    initialValue: U
  ): U;
  reduce<U>(
    callback: (accumulator: T | U, currentValue: T, currentIndex: number) => T | U
  ): T | U;
}

interface IteratorPrototype {
  reduce<T, U>(
    this: Iterator<T>,
    callback: (accumulator: U, currentValue: T, currentIndex: number) => U,
    initialValue?: U
  ): U;
}

function validateIterator<T>(iterator: unknown): Iterator<T> {
  if (iterator == null || typeof iterator !== 'object') {
    throw new TypeError('Iterator expected');
  }
  return iterator as Iterator<T>;
}

function validateCallback(callback: unknown): void {
  if (typeof callback !== 'function') {
    throw new TypeError('Callback must be a function');
  }
}

function iterateWithRecord<T>(
  iterator: Iterator<T>,
  callback: (value: T) => void,
  options: { IS_RECORD: boolean }
): void {
  let result = iterator.next();
  while (!result.done) {
    callback(result.value);
    result = iterator.next();
  }
}

function reduce<T, U>(
  this: Iterator<T>,
  callback: (accumulator: U, currentValue: T, currentIndex: number) => U,
  ...args: [U?]
): U {
  const iterator = validateIterator<T>(this);
  validateCallback(callback);

  const hasInitialValue = args.length >= 1;
  let accumulator: U | undefined = hasInitialValue ? args[0] : undefined;
  let index = 0;
  let isFirstIteration = !hasInitialValue;

  iterateWithRecord<T>(
    iterator,
    (currentValue: T) => {
      if (isFirstIteration) {
        isFirstIteration = false;
        accumulator = currentValue as unknown as U;
      } else {
        accumulator = callback(accumulator as U, currentValue, index);
      }
      index++;
    },
    { IS_RECORD: true }
  );

  if (isFirstIteration) {
    throw new TypeError('Reduce of empty iterator with no initial value');
  }

  return accumulator as U;
}

export { reduce };