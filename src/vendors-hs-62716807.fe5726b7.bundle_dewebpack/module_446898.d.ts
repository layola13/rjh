/**
 * Well-known Symbol registry and factory
 * 
 * This module provides a mechanism for creating and caching well-known symbols
 * that are used throughout the runtime environment. It ensures consistent symbol
 * references across different parts of the application.
 * 
 * @module WellKnownSymbols
 */

/**
 * Global Symbol constructor reference
 */
declare const globalSymbol: SymbolConstructor | undefined;

/**
 * Shared store for well-known symbols
 */
declare const symbolStore: Record<string, symbol>;

/**
 * Check if an object has a specific property
 */
declare function hasOwnProperty(obj: object, key: string | symbol): boolean;

/**
 * Generate a unique identifier for a symbol
 */
declare function generateUniqueId(prefix: string): symbol;

/**
 * Flag indicating if native Symbol support is available
 */
declare const hasNativeSymbolSupport: boolean;

/**
 * Flag indicating if Symbol.for is available
 */
declare const hasSymbolFor: boolean;

/**
 * Symbol factory function - uses Symbol.for if available, otherwise falls back
 * to Symbol constructor or unique ID generator
 */
declare const symbolFactory: ((key: string) => symbol) | ((key: string) => symbol) | ((key: string) => symbol);

/**
 * Retrieves or creates a well-known symbol
 * 
 * This function maintains a cache of well-known symbols. If a symbol with the
 * given name doesn't exist, it creates one using the most appropriate method:
 * 1. If Symbol.for exists, use it to create a global symbol
 * 2. If native Symbol exists, retrieve it directly (e.g., Symbol.iterator)
 * 3. Otherwise, fall back to generating a unique identifier
 * 
 * @param symbolName - The name of the well-known symbol (e.g., "iterator", "toStringTag")
 * @returns The symbol associated with the given name
 * 
 * @example
 * const iteratorSymbol = getWellKnownSymbol("iterator");
 * const toStringTagSymbol = getWellKnownSymbol("toStringTag");
 */
export default function getWellKnownSymbol(symbolName: string): symbol;