/**
 * Iterator creator utility
 * Creates a new iterator constructor that inherits from IteratorPrototype
 * 
 * @module IteratorCreator
 */

/**
 * Descriptor object for object properties
 */
interface PropertyDescriptor {
  value?: any;
  writable?: boolean;
  enumerable?: boolean;
  configurable?: boolean;
  get?(): any;
  set?(v: any): void;
}

/**
 * Iterator protocol interface
 */
interface Iterator<T = any, TReturn = any, TNext = undefined> {
  next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
  return?(value?: TReturn): IteratorResult<T, TReturn>;
  throw?(e?: any): IteratorResult<T, TReturn>;
}

/**
 * Iterator result returned by next()
 */
interface IteratorResult<T, TReturn = any> {
  done: boolean;
  value: T | TReturn;
}

/**
 * Base iterator prototype object
 */
interface IteratorPrototype {
  [Symbol.iterator](): Iterator<any>;
}

/**
 * Constructor function type for iterators
 */
interface IteratorConstructor<T = any> {
  new (...args: any[]): Iterator<T>;
  prototype: Iterator<T>;
}

/**
 * Registry of well-known iterators
 */
interface IteratorRegistry {
  [iteratorName: string]: () => Iterator<any>;
}

/**
 * Creates a new iterator constructor function
 * 
 * @param constructor - The constructor function to be enhanced
 * @param iteratorName - Name of the iterator (e.g., "Array Iterator", "String Iterator")
 * @param nextMethod - The implementation of the next() method
 * @param isEnumerable - Whether the iterator should be enumerable (default: false, inverted via +!s)
 * @returns The enhanced constructor function with iterator protocol
 * 
 * @example
 *