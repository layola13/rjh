/**
 * Creates an iterator function for array-like collections.
 * Returns the next value in the sequence on each call until exhausted.
 * 
 * @remarks
 * This is a closure-based iterator implementation that maintains internal state
 * through the captured `index` variable. Compatible with ES5 iteration protocol.
 * 
 * @template T - The type of elements in the collection
 * @param collection - The array or array-like object to iterate over
 * @returns An iterator function that returns iteration results
 * 
 * @example
 *