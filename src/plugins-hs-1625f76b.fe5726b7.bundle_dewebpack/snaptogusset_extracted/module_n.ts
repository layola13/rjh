function createIterator<T>(elements: T[]): () => IteratorResult<T> {
  let currentIndex = 0;

  return function(): IteratorResult<T> {
    if (currentIndex >= elements.length) {
      return {
        done: true,
        value: undefined
      };
    }

    return {
      done: false,
      value: elements[currentIndex++]
    };
  };
}