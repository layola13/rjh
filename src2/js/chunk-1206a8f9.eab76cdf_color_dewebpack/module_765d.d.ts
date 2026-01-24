/**
 * Observable Symbol Polyfill Module
 * 
 * This module registers the 'observable' symbol to ensure compatibility
 * with environments that may not natively support Symbol.observable.
 * 
 * @module ObservableSymbolPolyfill
 * @dependencies WellKnownSymbolModule (6718)
 */

/**
 * Type definition for the well-known symbol registration function
 * Registers a well-known symbol identifier in the global symbol registry
 * 
 * @param symbolName - The name of the well-known symbol to register (e.g., 'observable')
 * @returns void
 */
type WellKnownSymbolRegistrar = (symbolName: string) => void;

/**
 * Initializes the Observable symbol polyfill by registering 'observable'
 * as a well-known symbol in the global symbol registry.
 * 
 * This ensures that Symbol.observable is available for use in reactive
 * programming patterns and Observable implementations.
 */
declare function initializeObservableSymbol(): void;

export { initializeObservableSymbol, WellKnownSymbolRegistrar };