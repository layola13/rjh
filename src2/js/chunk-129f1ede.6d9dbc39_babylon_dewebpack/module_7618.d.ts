/**
 * Type checking utility that handles both primitive types and ES6 Symbol type.
 * 
 * This module provides a robust type detection function that correctly identifies
 * Symbol types in environments where they are available, while falling back to
 * standard typeof for other types.
 * 
 * @module TypeChecker
 */

/**
 * Symbol constructor type (imported from module 67bb)
 * Represents the native Symbol function when available
 */
type SymbolConstructor = typeof Symbol;

/**
 * Iterator symbol type (imported from module 5d58)
 * Represents Symbol.iterator or equivalent
 */
type IteratorSymbol = typeof Symbol.iterator;

/**
 * Possible type strings that can be returned by the type checker
 */
type TypeString = 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function';

/**
 * Determines the type of a given value with proper Symbol support.
 * 
 * In environments where Symbol is available (typeof Symbol === "function" && typeof Symbol.iterator === "symbol"),
 * this function correctly identifies Symbol values. Otherwise, it falls back to the standard typeof operator.
 * 
 * @param value - The value whose type needs to be determined
 * @returns A string representing the type of the value
 * 
 * @example
 *