/**
 * Reduces an array to a single value by iteratively applying a callback function.
 * 
 * @template T - The type of elements in the array
 * @template U - The type of the accumulated result
 * 
 * @param array - The array to reduce
 * @param callback - The function to execute on each element, receiving:
 *   - accumulator: The accumulated value
 *   - currentValue: The current element being processed
 *   - currentIndex: The index of the current element
 *   - array: The original array
 * @param initialValue - The initial value to start the reduction. If not provided and array is not empty, uses the first element
 * @param useFirstElement - Whether to use the first element as initial value when initialValue is not provided
 * 
 * @returns The final accumulated value after processing all elements
 * 
 * @example
 * // Sum all numbers
 * reduce([1, 2, 3, 4], (acc, val) => acc + val, 0, false); // Returns 10
 * 
 * @example
 * // Use first element as initial value
 * reduce([1, 2, 3], (acc, val) => acc + val, undefined, true); // Returns 6
 */
export function reduce<T, U>(
  array: T[] | null | undefined,
  callback: (accumulator: U, currentValue: T, currentIndex: number, array: T[]) => U,
  initialValue: U,
  useFirstElement?: boolean
): U;