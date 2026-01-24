/**
 * Creates an observable operator that emits a sequence of values from an array.
 * 
 * This function takes an array and returns an operator that will emit each element
 * of the array to a subscriber, then complete the subscription if it hasn't been closed.
 * 
 * @template T - The type of elements in the array
 * @param values - The array of values to emit
 * @returns An operator function that emits the values to a subscriber
 * 
 * @example
 *