function createIterator<T>(elements: T[]): () => IteratorResult<T> {
  let index = 0;
  
  return function(): IteratorResult<T> {
    return index >= elements.length
      ? { done: true, value: undefined }
      : { done: false, value: elements[index++] };
  };
}