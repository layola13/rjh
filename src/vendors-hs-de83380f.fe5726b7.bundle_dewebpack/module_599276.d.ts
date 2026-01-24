/**
 * Generator Runtime Module
 * Provides utilities for ES6 generator functions and async iteration
 */

/**
 * Async wrapper that returns a promise-like object
 */
interface AsyncWrapper<T = unknown> {
  /** The wrapped value/promise */
  value: T;
  /** Optional promise resolution callback */
  then?: (resolve: (value: T) => void, reject: (error: Error) => void) => void;
}

/**
 * Generator context object passed to wrapped generators
 */
interface GeneratorContext<T = unknown> {
  /** Marks the end of generator execution */
  stop(): void;
  
  /** Catches and handles errors in generator */
  catch(): T;
  
  /** Abruptly completes generator with specified completion type */
  abrupt(type: 'throw' | 'return' | 'break' | 'continue', value?: unknown): void;
  
  /** Delegates iteration to another generator */
  delegateYield(iterator: Iterator<unknown>, resultName: string, nextLocation: unknown): void;
  
  /** Finishes generator execution at specified location */
  finish(location: unknown): void;
  
  /** Name of the result property for delegated yield */
  resultName?: string;
  
  /** The value sent to the generator */
  sent?: T;
  
  /** Previous execution context */
  prev?: unknown;
  
  /** Next execution location */
  next?: unknown;
}

/**
 * Configuration options for wrapping generators
 */
interface WrapOptions {
  /** Whether to reverse the execution order */
  reverse?: boolean;
}

/**
 * Generator function type
 */
type GeneratorFn<T = unknown, TReturn = unknown, TNext = unknown> = (
  this: unknown,
  context: GeneratorContext<T>
) => Generator<T, TReturn, TNext>;

/**
 * Async generator function type
 */
type AsyncGeneratorFn<T = unknown, TReturn = unknown, TNext = unknown> = (
  this: unknown,
  context: GeneratorContext<T>
) => AsyncGenerator<T, TReturn, TNext>;

/**
 * Generator Runtime API
 */
interface GeneratorRuntime {
  /**
   * Wraps a generator function with runtime support
   * @param generatorFn - The generator function to wrap
   * @param outerFn - The outer function context
   * @param self - The 'this' context
   * @param options - Optional configuration
   * @returns Wrapped generator
   */
  wrap<T = unknown, TReturn = unknown, TNext = unknown>(
    generatorFn: GeneratorFn<T, TReturn, TNext>,
    outerFn?: Function,
    self?: unknown,
    options?: WrapOptions
  ): Generator<T, TReturn, TNext>;

  /**
   * Checks if a function is a generator function
   * @param fn - Function to check
   * @returns True if fn is a generator function
   */
  isGeneratorFunction(fn: unknown): fn is GeneratorFunction;

  /**
   * Marks a function as a generator function
   * @param fn - Function to mark
   * @returns The marked function
   */
  mark<T extends Function>(fn: T): T;

  /**
   * Wraps a value for async iteration
   * @param value - The value to wrap
   * @param unwrap - Whether to unwrap the value
   * @returns Async wrapped value
   */
  awrap<T = unknown>(value: T, unwrap?: boolean): AsyncWrapper<T>;

  /**
   * Async iterator constructor
   */
  AsyncIterator: new <T = unknown>() => AsyncIterator<T>;

  /**
   * Creates an async generator function
   * @param generatorFn - The generator function to wrap
   * @param outerFn - The outer function context
   * @param self - The 'this' context
   * @param tryLocsList - Try-catch location list
   * @param promiseImpl - Promise implementation to use
   * @returns Async generator
   */
  async<T = unknown, TReturn = unknown, TNext = unknown>(
    generatorFn: GeneratorFn<T, TReturn, TNext>,
    outerFn?: Function,
    self?: unknown,
    tryLocsList?: unknown,
    promiseImpl?: PromiseConstructor
  ): AsyncGenerator<T, TReturn, TNext>;

  /**
   * Creates an iterator over object keys
   * @param object - Object to iterate over
   * @returns Iterator of keys
   */
  keys<T extends object>(object: T): Iterator<keyof T>;

  /**
   * Creates an iterator over object values
   * @param iterable - Iterable to create values iterator from
   * @returns Iterator of values
   */
  values<T = unknown>(iterable: Iterable<T>): Iterator<T>;
}

/**
 * Main module export - Generator runtime factory
 */
declare const generatorRuntime: GeneratorRuntime;

export = generatorRuntime;
export as namespace generatorRuntime;

/**
 * CommonJS module properties
 */
declare namespace generatorRuntime {
  /** ESModule marker */
  export const __esModule: true;
  /** Default export (same as module.exports) */
  export { generatorRuntime as default };
}