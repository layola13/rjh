/**
 * Well-Known Symbols (WKS) registry module
 * Provides access to JavaScript built-in symbols with fallback mechanisms
 * @module WellKnownSymbols
 * @description Manages a registry of well-known symbols, creating them if they don't exist.
 * Supports native Symbol, Symbol.for, and fallback string-based identifiers.
 * @example
 * const iteratorSymbol = getWellKnownSymbol('iterator');
 * const toStringTagSymbol = getWellKnownSymbol('toStringTag');
 */

/**
 * Registry cache for storing well-known symbols
 */
type SymbolRegistry = Record<string, symbol | string>;

/**
 * Retrieves or creates a well-known symbol by name
 * @param symbolName - The name of the well-known symbol (e.g., "iterator", "toStringTag")
 * @returns The symbol associated with the given name
 */
declare function getWellKnownSymbol(symbolName: string): symbol;

export { getWellKnownSymbol, SymbolRegistry };