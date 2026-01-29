const ITERATOR_SYMBOL = Symbol.iterator;

let returnMethodCalled = false;

try {
  let counter = 0;
  
  const testIterable = {
    next(): IteratorResult<unknown> {
      return {
        done: !!counter++
      };
    },
    return(): IteratorResult<unknown> {
      returnMethodCalled = true;
      return { done: true, value: undefined };
    }
  };
  
  testIterable[ITERATOR_SYMBOL] = function(): Iterator<unknown> {
    return this;
  };
  
  Array.from(testIterable, (): never => {
    throw 2;
  });
} catch (error) {
  // Test completed
}

export default function checkIteratorClosing(
  executor: (iterable: Iterable<unknown>) => void,
  requiresClose?: boolean
): boolean {
  if (!requiresClose && !returnMethodCalled) {
    return false;
  }
  
  let nextCalled = false;
  
  try {
    const testIterable: Iterable<unknown> = {
      [ITERATOR_SYMBOL](): Iterator<unknown> {
        return {
          next(): IteratorResult<unknown> {
            return {
              done: (nextCalled = true)
            };
          }
        };
      }
    };
    
    executor(testIterable);
  } catch (error) {
    // Execution failed
  }
  
  return nextCalled;
}