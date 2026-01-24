/**
 * Iterator factory module
 * Creates iterator constructors with standard iterator protocol compliance
 * @module IteratorFactory
 */

/**
 * Configuration object for iterator properties
 */
interface IteratorPropertyDescriptor {
  next: PropertyDescriptor;
}

/**
 * Creates a new iterator constructor with the specified prototype chain
 * 
 * @template T - The type of values yielded by the iterator
 * @param Constructor - The constructor function to be enhanced as an iterator
 * @param name - The name prefix for the iterator (e.g., "Array", "String")
 * @param nextFunction - The next() method implementation that advances the iterator
 * 
 * @remarks
 * This function:
 * 1. Creates a prototype chain inheriting from the base iterator object
 * 2. Adds a non-enumerable next() method via property descriptor
 * 3. Sets the constructor's name to "{name} Iterator"
 * 4. Ensures compliance with the ES6 iterator protocol
 * 
 * @example
 *