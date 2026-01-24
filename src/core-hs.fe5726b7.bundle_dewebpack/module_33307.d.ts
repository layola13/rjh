/**
 * Array.prototype.reduce polyfill module
 * 
 * This module provides a polyfill for Array.prototype.reduce method,
 * ensuring compatibility across different browser versions.
 * 
 * @module ArrayReducePolyfill
 */

/**
 * Polyfill configuration for Array.prototype.reduce
 * 
 * Applied when:
 * - Native implementation is unavailable, OR
 * - Browser version is between 80-82 (inclusive), OR
 * - The "reduce" method fails feature detection
 */
declare module 'array-reduce-polyfill' {
  /**
   * Callback function for array reduction
   * 
   * @template T - The type of array elements
   * @template U - The type of the accumulator/return value
   * @param accumulator - The accumulated value from previous iterations
   * @param currentValue - The current element being processed
   * @param currentIndex - The index of the current element
   * @param array - The array being reduced
   * @returns The updated accumulator value
   */
  type ReduceCallback<T, U> = (
    accumulator: U,
    currentValue: T,
    currentIndex: number,
    array: T[]
  ) => U;

  /**
   * Polyfill implementation of Array.prototype.reduce
   * 
   * Executes a reducer function on each element of the array,
   * resulting in a single output value.
   * 
   * @template T - The type of array elements
   * @template U - The type of the reduced result
   * @param callbackFn - Function to execute on each element
   * @param initialValue - Optional initial value for the accumulator
   * @returns The single value resulting from the reduction
   * @throws {TypeError} If array is empty and no initialValue is provided
   */
  interface ArrayReduceMethod {
    <T>(
      this: T[],
      callbackFn: ReduceCallback<T, T>
    ): T;
    
    <T>(
      this: T[],
      callbackFn: ReduceCallback<T, T>,
      initialValue: T
    ): T;
    
    <T, U>(
      this: T[],
      callbackFn: ReduceCallback<T, U>,
      initialValue: U
    ): U;
  }

  /**
   * Feature detection result for native reduce support
   */
  export const hasNativeReduce: boolean;

  /**
   * Browser version threshold for conditional polyfill application
   */
  export const BROWSER_VERSION_MIN: 79;
  export const BROWSER_VERSION_MAX: 83;

  /**
   * Current browser version detected
   */
  export const detectedBrowserVersion: number;
}

declare global {
  interface Array<T> {
    /**
     * Calls the specified callback function for all elements in an array.
     * The return value of the callback function is the accumulated result,
     * and is provided as an argument in the next call to the callback function.
     * 
     * @param callbackFn - A function that accepts up to four arguments.
     *                     The reduce method calls the callbackFn function one time for each element in the array.
     * @param initialValue - If initialValue is specified, it is used as the initial value to start the accumulation.
     *                       The first call to the callbackFn function provides this value as an argument instead of an array value.
     * @returns The accumulated result from the last call to the callback function
     */
    reduce(
      callbackFn: (
        previousValue: T,
        currentValue: T,
        currentIndex: number,
        array: T[]
      ) => T
    ): T;

    reduce(
      callbackFn: (
        previousValue: T,
        currentValue: T,
        currentIndex: number,
        array: T[]
      ) => T,
      initialValue: T
    ): T;

    reduce<U>(
      callbackFn: (
        previousValue: U,
        currentValue: T,
        currentIndex: number,
        array: T[]
      ) => U,
      initialValue: U
    ): U;
  }
}

export {};