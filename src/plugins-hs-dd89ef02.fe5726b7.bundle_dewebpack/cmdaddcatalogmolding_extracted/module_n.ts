function createArrayIterator<T>(array: T[], startIndex: number = 0): () => IteratorResult<T> {
  let currentIndex = startIndex;
  
  return (): IteratorResult<T> => {
    if (currentIndex >= array.length) {
      return {
        done: true,
        value: undefined
      };
    }
    
    return {
      done: false,
      value: array[currentIndex++]
    };
  };
}