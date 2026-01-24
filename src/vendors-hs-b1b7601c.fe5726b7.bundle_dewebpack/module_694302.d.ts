/**
 * Symbol iterator utilities for cross-environment compatibility.
 * Provides a consistent way to access the iterator symbol across different JavaScript environments.
 * @module SymbolIterator
 */

/**
 * Gets the Symbol.iterator if available, otherwise returns a string fallback.
 * This ensures compatibility with environments that don't support ES6 Symbols.
 * 
 * @returns The native Symbol.iterator if available, otherwise the string "@@iterator"
 * @example
 * const iteratorSymbol = getSymbolIterator();
 * // Returns Symbol.iterator in modern environments
 * // Returns "@@iterator" in legacy environments
 */
export declare function getSymbolIterator(): symbol | string;

/**
 * The iterator symbol used for making objects iterable.
 * This is the resolved value of getSymbolIterator() at module initialization.
 * 
 * @example
 * const myIterable = {
 *   [iterator]() {
 *     // Iterator implementation
 *   }
 * };
 */
export declare const iterator: symbol | string;