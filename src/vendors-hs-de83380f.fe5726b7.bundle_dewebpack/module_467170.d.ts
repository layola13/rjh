/**
 * Async generator wrapper helper for enabling async iteration on generators.
 * This module provides runtime support for async generator functions in environments
 * that may not natively support them or when transpiling from modern syntax.
 * 
 * @module AsyncGeneratorWrapper
 */

/**
 * Represents a wrapped async value that needs to be unwrapped.
 * Used internally to distinguish between regular values and values that need async resolution.
 */
interface AwaitValue<T = unknown> {
  /** The wrapped value to be awaited */
  v: T;
}

/**
 * Standard generator result object.
 */
interface GeneratorResult<T = unknown> {
  /** Whether the generator has completed */
  done?: boolean;
  /** The yielded or returned value */
  value: T;
}

/**
 * Generator interface with standard next/throw/return methods.
 */
interface Generator<T = unknown, TReturn = unknown, TNext = unknown> {
  next(value?: TNext): GeneratorResult<T | TReturn>;
  throw?(exception: unknown): GeneratorResult<T | TReturn>;
  return?(value?: TReturn): GeneratorResult<T | TReturn>;
}

/**
 * Promise constructor interface for creating new promises.
 */
interface PromiseConstructor {
  new <T>(executor: (resolve: (value: T) => void, reject: (reason: unknown) => void) => void): Promise<T>;
  resolve<T>(value: T): Promise<T>;
}

/**
 * Defines a non-enumerable property on an object.
 * 
 * @param target - The object to define the property on
 * @param propertyKey - The property name
 * @param value - The property value
 * @param enumerable - Whether the property should be enumerable (default: false)
 */
declare function defineProperty(
  target: object,
  propertyKey: PropertyKey,
  value: unknown,
  enumerable?: boolean
): void;

/**
 * Wraps a generator to support async iteration patterns.
 * Handles the async/await flow for generator methods (next, throw, return).
 * 
 * @param generator - The generator instance to wrap
 * @param PromiseImpl - The Promise constructor to use for async operations
 * @returns The wrapped generator with async iteration support
 * 
 * @example
 *