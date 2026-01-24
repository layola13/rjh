/**
 * Invokes an iterator method with proper error handling and cleanup.
 * 
 * This utility function safely calls an iterator method (like next, return, or throw)
 * and ensures the iterator's return method is called for cleanup if an error occurs.
 * 
 * @template T - The type of value produced by the iterator
 * @template TReturn - The return type of the iterator method
 * 
 * @param iterator - The iterator object to invoke methods on
 * @param iteratorMethod - The method to call (typically a function that processes iterator values)
 * @param value - The value to pass to the iterator method (can be a tuple [key, value] or single value)
 * @param shouldUnpackTuple - If true, unpacks value as [key, value] tuple; if false, passes value directly
 * 
 * @returns The result of calling iteratorMethod with the processed value
 * 
 * @throws Re-throws any error after attempting to call iterator.return() for cleanup
 * 
 * @example
 * // With tuple unpacking
 * invokeIteratorMethod(iter, callback, [key, val], true);
 * 
 * @example
 * // Without tuple unpacking
 * invokeIteratorMethod(iter, callback, singleValue, false);
 */
export function invokeIteratorMethod<T, TReturn>(
  iterator: Iterator<T> & { return?: () => IteratorResult<T> },
  iteratorMethod: (key: unknown, value: unknown) => TReturn | ((val: unknown) => TReturn),
  value: unknown,
  shouldUnpackTuple: boolean
): TReturn {
  try {
    if (shouldUnpackTuple) {
      // Ensure value is an object with indexed properties
      const tupleValue = toObject(value) as [unknown, unknown];
      return (iteratorMethod as (key: unknown, value: unknown) => TReturn)(tupleValue[0], tupleValue[1]);
    } else {
      return (iteratorMethod as (val: unknown) => TReturn)(value);
    }
  } catch (error) {
    // Attempt to call iterator's return method for cleanup
    const returnMethod = iterator.return;
    
    if (returnMethod !== undefined) {
      toObject(returnMethod.call(iterator));
    }
    
    // Re-throw the original error
    throw error;
  }
}

/**
 * Converts a value to an object, throwing TypeError if the value is null or undefined.
 * This function corresponds to the imported dependency "cb7c".
 * 
 * @param value - The value to convert to an object
 * @returns The value as an object
 * @throws {TypeError} If value is null or undefined
 */
declare function toObject(value: unknown): object;