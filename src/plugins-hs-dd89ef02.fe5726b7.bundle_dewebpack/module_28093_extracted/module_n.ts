function createIterator<T>(array: T[]): () => IteratorResult<T> {
  let index = 0;
  const length = array.length;

  return (): IteratorResult<T> => {
    if (index >= length) {
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