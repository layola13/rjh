/**
 * Regenerator Runtime Type Definitions
 * 
 * Provides runtime support for ES2015+ async/await and generator functions.
 * This module exports the regenerator runtime and attempts to make it globally available.
 */

/**
 * Generator state enumeration
 */
export enum GeneratorState {
  SuspendedStart = 'suspendedStart',
  SuspendedYield = 'suspendedYield',
  Executing = 'executing',
  Completed = 'completed'
}

/**
 * Context object used internally by generator functions to maintain execution state
 */
export interface GeneratorContext {
  /** Current execution state */
  state: GeneratorState;
  
  /** Next instruction pointer */
  next: number;
  
  /** Previous instruction pointer */
  prev: number;
  
  /** Indicates if generator has completed execution */
  done: boolean;
  
  /** Completion value or exception */
  value?: unknown;
  
  /** Exception handling method */
  method?: 'next' | 'throw' | 'return';
  
  /** Argument passed to the generator method */
  arg?: unknown;
  
  /** Delegate generator for yield* expressions */
  delegate?: Iterator<unknown> | null;
  
  /** Stop execution with a value */
  stop(): unknown;
  
  /** Dispatch exception handling */
  dispatchException(exception: unknown): boolean;
  
  /** Abort generator execution */
  abrupt(type: string, arg?: unknown): unknown;
  
  /** Complete generator execution */
  complete(record: IteratorResult<unknown>, afterLoc?: number): unknown;
  
  /** Finish execution block */
  finish(finallyLoc: number): unknown;
  
  /** Catch exception in try-catch block */
  catch(tryLoc: number): unknown;
  
  /** Reset generator state */
  reset(skipTempReset?: boolean): void;
}

/**
 * Async iterator result wrapper
 */
export interface AsyncIteratorResult<T> extends Promise<IteratorResult<T>> {}

/**
 * The main regenerator runtime object providing core generator and async/await functionality
 */
export interface RegeneratorRuntime {
  /**
   * Wraps a generator function to return a proper Generator object
   * @param innerFn - The generator function implementation
   * @param outerFn - The outer function (constructor) reference
   * @param self - The `this` context
   * @param tryLocsList - List of try-catch locations for exception handling
   * @returns A Generator object
   */
  wrap<T = unknown, TReturn = unknown, TNext = unknown>(
    innerFn: (context: GeneratorContext) => void,
    outerFn?: Function,
    self?: unknown,
    tryLocsList?: Array<[number, number, number?, number?]>
  ): Generator<T, TReturn, TNext>;

  /**
   * Marks a function as a generator function
   * @param genFun - The generator function
   * @returns The marked generator function
   */
  mark<T extends Function>(genFun: T): T;

  /**
   * Creates an async function wrapper for generator-based async operations
   * @param innerFn - The inner generator function
   * @param outerFn - The outer function reference
   * @param self - The `this` context
   * @param tryLocsList - List of try-catch locations
   * @returns A Promise-returning async function
   */
  async<T = unknown>(
    innerFn: (context: GeneratorContext) => void,
    outerFn?: Function,
    self?: unknown,
    tryLocsList?: Array<[number, number, number?, number?]>
  ): (...args: unknown[]) => Promise<T>;

  /**
   * Creates an awaitable Promise wrapper
   * @param value - The value or thenable to await
   * @returns A Promise
   */
  awrap<T = unknown>(value: T | PromiseLike<T>): Promise<T>;

  /**
   * Creates an async iterator from a sync iterator
   * @param iterable - The iterable to convert
   * @returns An async iterator
   */
  AsyncIterator(iterable: Iterable<unknown>): AsyncIterator<unknown>;

  /**
   * Checks if an object is a generator function
   * @param genFun - The function to check
   * @returns True if the function is a generator
   */
  isGeneratorFunction(genFun: unknown): genFun is GeneratorFunction;

  /**
   * Values helper for iteration
   * @param iterable - The iterable to create values from
   * @returns An iterator
   */
  values<T>(iterable: Iterable<T>): Iterator<T>;

  /**
   * Keys helper for object iteration
   * @param object - The object to get keys from
   * @returns An iterator of keys
   */
  keys(object: object): Iterator<string>;
}

/**
 * The regenerator runtime instance
 */
declare const regeneratorRuntime: RegeneratorRuntime;

export default regeneratorRuntime;

/**
 * Global augmentation to make regeneratorRuntime available globally
 */
declare global {
  const regeneratorRuntime: RegeneratorRuntime;
  
  interface GlobalThis {
    regeneratorRuntime: RegeneratorRuntime;
  }
}