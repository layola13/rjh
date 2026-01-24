/**
 * Well-Known Symbols (WKS) registry module
 * Provides access to JavaScript built-in symbols with fallback mechanisms
 * 
 * @module WellKnownSymbols
 * @description Manages a registry of well-known symbols, creating them if they don't exist.
 * Supports native Symbol, Symbol.for, and fallback string-based identifiers.
 */

/**
 * Registry cache for storing well-known symbols
 */
type SymbolRegistry = Record<string, symbol | string>;

/**
 * Symbol constructor interface with optional extensions
 */
interface SymbolConstructor {
  /**
   * Returns a symbol for the given key from the global symbol registry
   */
  for?: (key: string) => symbol;
  
  /**
   * Creates a new symbol without registering it globally (polyfill-specific)
   */
  withoutSetter?: (description: string) => symbol;
  
  /**
   * Direct symbol property access (e.g., Symbol.iterator)
   */
  [key: string]: any;
}

/**
 * Retrieves or creates a well-known symbol by name
 * 
 * @param symbolName - The name of the well-known symbol (e.g., "iterator", "toStringTag")
 * @returns The symbol associated with the given name
 * 
 * @example
 *