type IteratorLike<T> = {
  next: () => IteratorResult<T>;
};

function iterateWithCallback<T, R>(
  iterator: IteratorLike<T>,
  callback: (value: T) => R | undefined,
  nextFn?: (iter: IteratorLike<T>) => IteratorResult<T>
): R | undefined {
  const getNext = nextFn || ((iter: IteratorLike<T>) => iter.next());
  
  let result: IteratorResult<T>;
  let callbackResult: R | undefined;
  
  while (!(result = getNext(iterator)).done) {
    callbackResult = callback(result.value);
    if (callbackResult !== undefined) {
      return callbackResult;
    }
  }
  
  return undefined;
}

export default iterateWithCallback;