/**
 * Creates an iterator result object.
 * 
 * This utility function constructs an object conforming to the IteratorResult interface,
 * which is used by iterators to communicate both the current value and completion status.
 * 
 * @template T - The type of the value being iterated over
 * @param value - The current value in the iteration sequence
 * @param done - Whether the iteration has completed
 * @returns An iterator result object with the provided value and done status
 * 
 * @example
 *