/**
 * Iterator to Observer converter
 * 
 * Creates a subscription function that consumes an iterator and pushes its values
 * to an observer until the iterator is exhausted or the observer is closed.
 * 
 * @template T - The type of values produced by the iterator
 * @param iterable - An iterable object that provides an iterator
 * @returns A function that accepts an observer and subscribes it to the iterator's values
 * 
 * @example
 *