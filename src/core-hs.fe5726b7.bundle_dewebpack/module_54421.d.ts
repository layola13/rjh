/**
 * Property descriptor for an iterator's next method
 */
interface PropertyDescriptor<T> {
  /** Property value */
  value?: T;
  /** Whether the property is writable */
  writable?: boolean;
  /** Whether the property is enumerable */
  enumerable?: boolean;
  /** Whether the property can be reconfigured */
  configurable?: boolean;
}

/**
 * Base iterator prototype interface
 * Contains the core iterator protocol implementation
 */
interface IteratorPrototype {
  /** Returns the iterator object itself */
  next(): IteratorResult<unknown>;
  [Symbol.iterator](): this;
}

/**
 * Iterator result interface
 * Represents the result of a single iterator step
 */
interface IteratorResult<T> {
  /** Whether the iterator has completed */
  done: boolean;
  /** The current value from the iterator */
  value: T;
}

/**
 * Well-known iterator symbols registry
 * Maps iterator type names to their corresponding iterator functions
 */
interface IteratorRegistry {
  [key: string]: () => IteratorPrototype;
}

/**
 * Iterator constructor interface
 * Represents a class that implements the iterator protocol
 */
interface IteratorConstructor<T = unknown> {
  /** The constructor function */
  new (...args: unknown[]): Iterator<T>;
  /** The prototype object */
  prototype: Iterator<T>;
}

/**
 * Core iterator interface
 * Represents an object that implements the iterator protocol
 */
interface Iterator<T> {
  /** Returns the next value in the iteration */
  next(): IteratorResult<T>;
  /** Returns the iterator object itself */
  [Symbol.iterator](): this;
}

/**
 * Creates a custom iterator constructor with a specified prototype
 * 
 * This factory function constructs a new iterator class by:
 * 1. Creating a prototype that inherits from the base IteratorPrototype
 * 2. Adding a `next` method with the provided implementation
 * 3. Setting the constructor name to "{name} Iterator"
 * 4. Registering the iterator in the global registry
 * 
 * @template T - The type of values yielded by the iterator
 * @param constructor - The constructor function for the iterator
 * @param name - The base name for the iterator (e.g., "Array", "String")
 * @param nextImplementation - The implementation of the next() method
 * @param hasReturnValue - Whether the iterator can return a value (optional, default: true)
 * @returns The configured iterator constructor with prototype chain set up
 * 
 * @example
 *