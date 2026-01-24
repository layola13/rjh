/**
 * Iterator method getter for ES6 iteration protocol
 * 
 * This module provides a utility function to retrieve the iterator method
 * from an object, supporting both Symbol.iterator and legacy @@iterator.
 * 
 * @module IteratorMethodGetter
 */

import { classof } from './classof';
import { getWellKnownSymbol } from './well-known-symbols';
import { Iterators } from './iterators';
import { CoreLibrary } from './core';

/**
 * Retrieves the iterator method from an object.
 * 
 * Attempts to get the iteration method in the following order:
 * 1. Symbol.iterator property (ES6 standard)
 * 2. @@iterator property (legacy/polyfill)
 * 3. Default iterator from the Iterators registry based on object type
 * 
 * @param target - The object from which to retrieve the iterator method
 * @returns The iterator method function if found, undefined otherwise
 * 
 * @example
 *