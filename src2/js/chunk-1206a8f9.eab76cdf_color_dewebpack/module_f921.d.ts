/**
 * Symbol polyfill module
 * 
 * This module imports necessary polyfills for the ES6 Symbol implementation
 * and re-exports the Symbol constructor from the core library.
 * 
 * @module SymbolPolyfill
 */

/**
 * ES6 Symbol implementation with polyfills
 * 
 * This interface represents the Symbol constructor and its static methods.
 * Symbols are unique and immutable primitive values that can be used as object property keys.
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
 */
export interface SymbolConstructor {
  /**
   * Creates a new Symbol with an optional description
   * @param description - Optional string description for the symbol
   * @returns A unique Symbol value
   */
  (description?: string | number): symbol;

  /**
   * Returns a Symbol object from the global symbol registry
   * @param key - The key for the symbol
   * @returns The symbol associated with the given key
   */
  readonly for: (key: string) => symbol;

  /**
   * Returns the key for a given symbol from the global symbol registry
   * @param sym - The symbol to get the key for
   * @returns The key string or undefined
   */
  readonly keyFor: (sym: symbol) => string | undefined;

  /**
   * Built-in symbol values used by JavaScript
   */
  readonly asyncIterator: symbol;
  readonly hasInstance: symbol;
  readonly isConcatSpreadable: symbol;
  readonly iterator: symbol;
  readonly match: symbol;
  readonly matchAll: symbol;
  readonly replace: symbol;
  readonly search: symbol;
  readonly species: symbol;
  readonly split: symbol;
  readonly toPrimitive: symbol;
  readonly toStringTag: symbol;
  readonly unscopables: symbol;
}

/**
 * The Symbol constructor exported from the polyfill library
 * 
 * Dependencies:
 * - 014b: Symbol core functionality polyfill
 * - c207: Symbol.prototype methods polyfill
 * - 69d3: Symbol registry (for/keyFor) polyfill
 * - 765d: Well-known symbols polyfill
 * - 584a: Core polyfill library
 */
declare const SymbolPolyfill: SymbolConstructor;

export default SymbolPolyfill;