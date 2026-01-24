/**
 * Async function helper utilities
 * Provides runtime support for async/await transpilation
 */

/**
 * Handles the iteration of an async generator/promise chain
 * @param generator - The generator function being executed
 * @param resolve - Promise resolve callback
 * @param reject - Promise reject callback
 * @param onFulfilled - Handler for successful promise resolution
 * @param onRejected - Handler for promise rejection
 * @param method - Generator method to call ('next' or 'throw')
 * @param value - Value to pass to the generator method
 */
declare function asyncGeneratorStep(
  generator: Generator<any, any, any>,
  resolve: (value: any) => void,
  reject: (reason?: any) => void,
  onFulfilled: (value: any) => void,
  onRejected: (reason: any) => void,
  method: 'next' | 'throw',
  value: any
): void;

/**
 * Wraps an async generator function to return a promise-based function
 * This is a polyfill for async/await syntax transformation
 * @param generatorFunction - The generator function to wrap
 * @returns A function that returns a Promise when called
 */
declare function asyncToGenerator<TArgs extends any[], TReturn>(
  generatorFunction: (...args: TArgs) => Generator<any, TReturn, any>
): (...args: TArgs) => Promise<TReturn>;

export default asyncToGenerator;