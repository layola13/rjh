/**
 * Creates an iterator result object
 * @description Utility function that constructs an object conforming to the IteratorResult interface
 * @template T - The type of the value being iterated over
 * @param value - The current value in the iteration sequence
 * @param done - Whether the iteration has completed
 * @returns An iterator result object with the provided value and done status
 * @example
 * const result1 = createIteratorResult(42, false);
 * const result2 = createIteratorResult(undefined, true);
 */
declare function createIteratorResult<T>(value: T, done: boolean): IteratorResult<T>;

export { createIteratorResult };