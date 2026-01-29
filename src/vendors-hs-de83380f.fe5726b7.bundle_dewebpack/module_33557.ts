export default function sliceIterator<T>(
  iterable: Iterable<T>,
  count: number
): T[] {
  if (Array.isArray(iterable)) {
    return iterable.slice(0, count);
  }

  const iterator = iterable?.[Symbol.iterator]?.() ?? iterable?.['@@iterator']?.();
  
  if (iterator === null || iterator === undefined) {
    return [];
  }

  const result: T[] = [];
  let isDone = false;
  let iterationError: unknown;
  let hasError = false;

  try {
    const nextMethod = iterator.next;

    if (count === 0) {
      if (Object(iterator) !== iterator) {
        return result;
      }
      isDone = true;
    } else {
      let current: IteratorResult<T>;
      while (
        !(isDone = (current = nextMethod.call(iterator)).done) &&
        (result.push(current.value), result.length !== count)
      ) {
        isDone = true;
      }
    }
  } catch (error) {
    hasError = true;
    iterationError = error;
  } finally {
    try {
      if (!isDone && iterator.return !== null && iterator.return !== undefined) {
        const returnValue = iterator.return();
        if (Object(returnValue) !== returnValue) {
          return result;
        }
      }
    } finally {
      if (hasError) {
        throw iterationError;
      }
    }
  }

  return result;
}