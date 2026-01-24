/**
 * Well-Known Symbols Registry Module
 * 
 * This module provides a centralized registry for managing well-known symbols.
 * It ensures that symbols are created once and reused across the application,
 * maintaining symbol identity and preventing duplicates.
 */

/**
 * Storage for well-known symbols, shared across the application
 */
declare const symbolStore: Record<string, symbol | string>;

/**
 * Generates a unique identifier string
 * 
 * @param prefix - The prefix for the identifier (e.g., "Symbol.")
 * @returns A unique string identifier
 */
declare function generateUniqueId(prefix: string): string;

/**
 * Native Symbol constructor (if available in the environment)
 */
declare const NativeSymbol: SymbolConstructor | undefined;

/**
 * Indicates whether native Symbol support is available
 */
declare const hasNativeSymbolSupport: boolean;

/**
 * Retrieves or creates a well-known symbol
 * 
 * When native Symbol support is available, this function returns the corresponding
 * built-in symbol (e.g., Symbol.iterator). Otherwise, it falls back to creating
 * a unique string identifier to simulate symbol behavior.
 * 
 * @param symbolName - The name of the well-known symbol (e.g., "iterator", "toStringTag")
 * @returns The well-known symbol or its string-based fallback
 * 
 * @example
 *