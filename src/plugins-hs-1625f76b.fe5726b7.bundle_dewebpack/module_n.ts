function createIterator<T>(collection: T[]): () => IteratorResult<T> {
  let index = 0;
  
  return function(): IteratorResult<T> {
    if (index >= collection.length) {
      return {
        done: true,
        value: undefined
      };
    }
    
    return {
      done: false,
      value: collection[index++]
    };
  };
}