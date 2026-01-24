/**
 * Regenerator Runtime Type Definitions
 * 
 * This module provides type definitions for the regenerator-runtime library,
 * which enables generator functions and async/await syntax in environments
 * that don't natively support them.
 * 
 * @module regenerator-runtime
 * @license MIT
 * @see https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE
 */

/**
 * Symbol-like interface for iterator protocols
 */
interface SymbolLike {
  iterator?: symbol | string;
  toStringTag?: symbol | string;
}

/**
 * Iterator result returned by generator next/return/throw methods
 */
interface IteratorResult<T> {
  /** The yielded or returned value */
  value: T;
  /** Whether the generator has completed execution */
  done: boolean;
}

/**
 * Standard iterator interface
 */
interface Iterator<T> {
  next(value?: unknown): IteratorResult<T>;
  return?(value?: unknown): IteratorResult<T>;
  throw?(error?: unknown): IteratorResult<T>;
}

/**
 * Generator function constructor interface
 */
interface GeneratorFunction {
  /** The prototype of generator instances */
  prototype: Generator;
  /** Constructor reference */
  constructor: GeneratorFunctionConstructor;
  /** Display name for debugging */
  displayName?: string;
}

/**
 * Generator function constructor
 */
interface GeneratorFunctionConstructor {
  prototype: GeneratorFunction;
  constructor: GeneratorFunctionConstructor;
}

/**
 * Generator instance interface
 */
interface Generator<T = unknown, TReturn = unknown, TNext = unknown> extends Iterator<T> {
  next(value?: TNext): IteratorResult<T | TReturn>;
  return(value?: TReturn): IteratorResult<T | TReturn>;
  throw(error?: unknown): IteratorResult<T | TReturn>;
  [Symbol.iterator](): Generator<T, TReturn, TNext>;
  [Symbol.toStringTag]: string;
}

/**
 * Internal state management for generator execution
 */
interface GeneratorState {
  /** Current program counter */
  p: number;
  /** Next instruction pointer */
  n: number;
  /** Current value */
  v: unknown;
  /** Abort handler */
  a: (type: number, arg: unknown) => IteratorResult<unknown>;
  /** Force completion */
  f: () => IteratorResult<unknown>;
  /** Delegate to sub-generator */
  d: (delegateIterator: Iterator<unknown>, finallyEntry: number) => IteratorResult<unknown>;
}

/**
 * Try-catch-finally entry in the completion record table
 */
type CompletionRecord = [
  /** Try block start location */
  tryLoc: number,
  /** Catch block location (or undefined) */
  catchLoc: number | undefined,
  /** Finally block location (or undefined) */
  finallyLoc: number | undefined,
  /** After location */
  afterLoc?: number,
  /** Delegate iterator state */
  delegateState?: number,
  /** Delegate result */
  delegateResult?: unknown
];

/**
 * Runtime exports for generator support
 */
interface RegeneratorRuntime {
  /**
   * Wraps a generator function to create an iterable generator
   * @param innerFn - The original generator function body
   * @param outerFn - The generator function constructor (optional)
   * @param self - The `this` context for the generator
   * @param tryLocsList - Array of try-catch-finally completion records
   * @returns A generator instance
   */
  w(
    innerFn: (context: unknown) => unknown,
    outerFn?: GeneratorFunction,
    self?: unknown,
    tryLocsList?: CompletionRecord[]
  ): Generator;

  /**
   * Marks a function as a generator function
   * @param genFun - The function to mark as a generator
   * @returns The marked generator function
   */
  m(genFun: Function): GeneratorFunction;
}

/**
 * Main regenerator runtime export
 * 
 * Provides utilities for creating and managing generator functions
 * in environments without native support.
 */
declare const regeneratorRuntime: RegeneratorRuntime;

export default regeneratorRuntime;
export { RegeneratorRuntime, Generator, GeneratorFunction, IteratorResult };