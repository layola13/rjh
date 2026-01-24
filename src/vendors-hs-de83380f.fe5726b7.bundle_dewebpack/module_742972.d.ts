/**
 * Creates an iterator from an iterable object, array, or generator.
 * 
 * This function attempts to obtain an iterator from the provided value using
 * the standard Symbol.iterator protocol, or by treating it as an array-like
 * object with a length property.
 * 
 * @param iterableObject - The object to convert into an iterator
 * @returns An iterator that yields values from the iterable object
 * @throws {TypeError} When the provided value is not iterable
 * 
 * @example
 *