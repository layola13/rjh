/**
 * Array reduce implementation utilities
 * Provides left-to-right and right-to-left reduce operations
 */

/**
 * Callback function type for reduce operations
 * @template T - The type of array elements
 * @template U - The type of the accumulator
 */
type ReduceCallback<T, U> = (
  accumulator: U,
  currentValue: T,
  currentIndex: number,
  array: object
) => U;

/**
 * Creates a reduce function that iterates in the specified direction
 * @template T - The type of array elements
 * @template U - The type of the accumulator
 * @param callback - Function to execute on each element
 * @param thisArg - Object to use as context
 * @param initialValue - Initial accumulator value
 * @param hasInitialValue - Whether an initial value was provided
 * @returns The final accumulated value
 */
interface ReduceFunction {
  <T, U>(
    callback: ReduceCallback<T, U>,
    thisArg: unknown,
    initialValue: U,
    hasInitialValue: number
  ): U;
}

/**
 * Reduce utilities for array operations
 */
interface ReduceUtilities {
  /**
   * Reduces array from left to right (start to end)
   */
  readonly left: ReduceFunction;
  
  /**
   * Reduces array from right to left (end to start)
   */
  readonly right: ReduceFunction;
}

export const reduce: ReduceUtilities;
export default reduce;