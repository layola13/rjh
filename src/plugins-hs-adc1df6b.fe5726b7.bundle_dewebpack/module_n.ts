function createIterator<T>(items: T[]): () => IteratorResult<T> {
  let index = 0;

  return function(): IteratorResult<T> {
    if (index >= items.length) {
      return {
        done: true,
        value: undefined
      };
    }
    
    return {
      done: false,
      value: items[index++]
    };
  };
}