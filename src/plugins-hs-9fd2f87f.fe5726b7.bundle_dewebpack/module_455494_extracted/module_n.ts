function createIterator<T>(items: T[]): () => IteratorResult<T> {
  let index = 0;
  
  return function(): IteratorResult<T> {
    return index >= items.length 
      ? { done: true, value: undefined }
      : { done: false, value: items[index++] };
  };
}