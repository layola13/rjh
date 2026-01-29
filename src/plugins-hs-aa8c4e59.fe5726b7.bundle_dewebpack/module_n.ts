function createIterator<T>(array: T[]): () => IteratorResult<T> {
  let index = 0;
  
  return function(): IteratorResult<T> {
    return index >= array.length
      ? { done: true, value: undefined }
      : { done: false, value: array[index++] };
  };
}