export default function iterableToArrayLimit<T>(iterable: Iterable<T>, limit: number): T[] {
  const iterator = iterable?.[Symbol.iterator]?.() ?? iterable?.['@@iterator']?.();
  
  if (iterator == null) {
    return [];
  }

  const result: T[] = [];
  let isDone = true;
  let hasError = false;
  let error: unknown;
  let returnValue: unknown;

  try {
    const nextMethod = iterator.next;

    if (limit === 0) {
      if (Object(iterator) !== iterator) {
        return result;
      }
      isDone = false;
    } else {
      let iterationResult: IteratorResult<T>;
      
      while (true) {
        iterationResult = nextMethod.call(iterator);
        isDone = iterationResult.done ?? false;
        
        if (isDone) {
          break;
        }
        
        result.push(iterationResult.value);
        
        if (result.length === limit) {
          break;
        }
        
        isDone = true;
      }
    }
  } catch (e) {
    hasError = true;
    error = e;
  } finally {
    try {
      if (!isDone && iterator.return != null) {
        returnValue = iterator.return();
        
        if (Object(returnValue) !== returnValue) {
          return result;
        }
      }
    } finally {
      if (hasError) {
        throw error;
      }
    }
  }

  return result;
}