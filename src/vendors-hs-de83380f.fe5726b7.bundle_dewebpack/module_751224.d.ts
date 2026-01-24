/**
 * AsyncToGenerator helper - Converts an async generator function into a promise-returning function.
 * This is a TypeScript polyfill for async/await syntax compilation.
 * 
 * @module AsyncToGenerator
 */

/**
 * Wraps a generator function and returns a promise-returning function.
 * Handles the iteration of the generator, resolving or rejecting based on yielded values.
 * 
 * @template TArgs - The argument types of the generator function
 * @template TReturn - The return type of the async operation
 * @param generatorFunction - A generator function to be executed asynchronously
 * @returns A function that returns a Promise resolving to the generator's final value
 */
declare function asyncToGenerator<TArgs extends unknown[], TReturn>(
  generatorFunction: (...args: TArgs) => Generator<unknown, TReturn, unknown>
): (...args: TArgs) => Promise<TReturn>;

export default asyncToGenerator;
export = asyncToGenerator;