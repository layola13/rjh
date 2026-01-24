/**
 * Iterator symbol polyfill module
 * 
 * This module ensures the well-known Symbol.iterator is available by:
 * 1. Loading necessary polyfills
 * 2. Exporting the iterator symbol from the core library
 * 
 * @module IteratorSymbol
 */

import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.iterator";
import { getWellKnownSymbol } from "core-js/internals/well-known-symbol";

/**
 * Retrieves the well-known Symbol.iterator
 * Used for making objects iterable in for-of loops and spread operations
 */
declare const iteratorSymbol: symbol;

export default iteratorSymbol;

/**
 * Type definition for the exported iterator symbol
 * This symbol is used to define the default iterator for an object
 * 
 * @example
 *