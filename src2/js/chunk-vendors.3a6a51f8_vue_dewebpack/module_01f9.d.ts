/**
 * Iterator Factory Module
 * 
 * A factory function for creating and installing iterators on constructor prototypes.
 * This module provides a standardized way to add iteration capabilities to objects,
 * supporting keys, values, and entries iteration patterns.
 * 
 * @module IteratorFactory
 */

/**
 * Iterator result returned by the next() method
 */
interface IteratorResult<T> {
  /** The current value in the iteration */
  value: T;
  /** Whether the iteration has completed */
  done: boolean;
}

/**
 * Base iterator interface
 */
interface Iterator<T> {
  /** Advances the iterator and returns the next result */
  next(): IteratorResult<T>;
  /** Returns the iterator itself */
  [Symbol.iterator](): Iterator<T>;
}

/**
 * Iteration kind types
 */
type IterationKind = "keys" | "values" | "entries";

/**
 * Iterator methods that will be added to the prototype
 */
interface IteratorMethods<T> {
  /** Returns an iterator for the values */
  values: () => Iterator<T>;
  /** Returns an iterator for the keys */
  keys: () => Iterator<number | string>;
  /** Returns an iterator for [key, value] pairs */
  entries: () => Iterator<[number | string, T]>;
}

/**
 * Constructor with iterable prototype
 */
interface IterableConstructor<T> {
  new (...args: any[]): any;
  prototype: {
    [Symbol.iterator]?: () => Iterator<T>;
    "@@iterator"?: () => Iterator<T>;
    [key: string]: any;
  };
}

/**
 * Creates and installs iterator methods on a constructor's prototype
 * 
 * This factory function enables iteration support for custom data structures
 * by automatically generating and installing iterator methods (keys, values, entries).
 * 
 * @template T - The type of values being iterated
 * 
 * @param constructor - The constructor whose prototype will receive iterator methods
 * @param name - The name of the constructor (e.g., "Array", "Map")
 * @param iteratorClass - The iterator implementation class
 * @param defaultMethod - The default iteration method implementation
 * @param defaultKind - The default iteration kind ("keys" | "values" | "entries")
 * @param hasKeys - Whether the object has numeric/string keys (affects keys iterator)
 * @param forced - Force installation even if iterator already exists
 * 
 * @returns An object containing the installed iterator methods (keys, values, entries)
 * 
 * @example
 *