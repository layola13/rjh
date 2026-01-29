async function executeAsyncIterator<T>(
  arg1: unknown,
  arg2: unknown,
  arg3: unknown,
  arg4: unknown,
  arg5: unknown
): Promise<T> {
  const iterator = createAsyncIterator<T>(arg1, arg2, arg3, arg4, arg5);
  const firstResult = await iterator.next();
  
  return firstResult.done ? firstResult.value : iterator.next();
}

export default executeAsyncIterator;

/**
 * Creates an async iterator from the provided arguments
 * Note: Implementation depends on module 906636
 */
declare function createAsyncIterator<T>(
  arg1: unknown,
  arg2: unknown,
  arg3: unknown,
  arg4: unknown,
  arg5: unknown
): AsyncIterator<T>;