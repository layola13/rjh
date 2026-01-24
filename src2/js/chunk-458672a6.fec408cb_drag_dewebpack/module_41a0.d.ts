/**
 * Creates an iterator constructor with a custom prototype.
 * 
 * This utility creates a constructor function for iterators that:
 * - Inherits from a base iterator prototype with @@iterator method
 * - Has a 'next' property descriptor pointing to the provided next function
 * - Sets the appropriate string tag for the iterator type
 * 
 * @module IteratorCreator
 */

import { create as objectCreate } from './object-create';
import { createPropertyDescriptor } from './property-descriptor';
import { setToStringTag } from './set-to-string-tag';
import { defineProperty } from './define-property';
import { wellKnownSymbol } from './well-known-symbol';

/**
 * Base iterator prototype object that implements the iterable protocol.
 * The @@iterator method returns the iterator itself.
 */
declare const baseIteratorPrototype: {
  [Symbol.iterator](): this;
};

/**
 * Constructor function type for iterators.
 */
interface IteratorConstructor<T = unknown> {
  new (...args: unknown[]): Iterator<T>;
  prototype: Iterator<T>;
}

/**
 * Creates a new iterator constructor function with proper prototype chain.
 * 
 * @template T - The type of values yielded by the iterator
 * @param Constructor - The constructor function to be transformed into an iterator constructor
 * @param name - The name of the iterator (e.g., "Array", "String", "Map")
 * @param nextFunction - The next() method implementation for the iterator
 * 
 * @example
 *