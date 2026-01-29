function createArrayIterator<T>(array: T[], startIndex: number = 0): () => IteratorResult<T> {
  let index = startIndex;
  
  return (): IteratorResult<T> => {
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