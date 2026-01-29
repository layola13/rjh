function createIterableIterator<T>(iterable: Iterable<T> | ArrayLike<T> | Iterator<T> | null | undefined): Iterator<T> {
  if (iterable != null) {
    const symbolIterator = (iterable as any)[
      typeof Symbol === "function" && Symbol.iterator || "@@iterator"
    ];
    
    if (symbolIterator) {
      return symbolIterator.call(iterable);
    }
    
    if (typeof (iterable as Iterator<T>).next === "function") {
      return iterable as Iterator<T>;
    }
    
    if (!isNaN((iterable as ArrayLike<T>).length)) {
      let index = 0;
      let arrayLike: ArrayLike<T> | undefined = iterable as ArrayLike<T>;
      
      return {
        next(): IteratorResult<T> {
          if (arrayLike && index >= arrayLike.length) {
            arrayLike = undefined;
          }
          
          return {
            value: arrayLike?.[index++] as T,
            done: !arrayLike
          };
        }
      };
    }
  }
  
  throw new TypeError(`${String(iterable)} is not iterable`);
}

export default createIterableIterator;