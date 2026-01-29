function createArrayIterator<T>(array: T[]): () => IteratorResult<T> {
  let index = 0;
  
  return function(): IteratorResult<T> {
    if (index >= array.length) {
      return {
        done: true,
        value: undefined
      };
    }
    
    return {
      done: false,
      value: array[index++]
    };
  };
}