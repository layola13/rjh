/**
 * Maps each element of a collection to a new value using the provided iteratee function.
 * Similar to Array.prototype.map but works with array-like objects and collections.
 * 
 * @template T - The type of elements in the input collection
 * @template R - The type of elements in the resulting array
 * @param collection - The collection to iterate over (array, array-like object, or iterable)
 * @param iteratee - The function invoked per iteration, receives (value, index|key, collection)
 * @returns A new array of values returned by the iteratee function
 * 
 * @example
 *