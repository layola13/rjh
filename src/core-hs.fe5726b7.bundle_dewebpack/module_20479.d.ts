/**
 * Checks if the environment supports native ES6 Symbols (not polyfilled).
 * 
 * This module verifies three conditions:
 * 1. Symbol constructor exists and is available
 * 2. Symbol implementation is not a polyfill/shim (Symbol.sham is falsy)
 * 3. Symbol.iterator has the correct typeof 'symbol'
 * 
 * @module NativeSymbolDetection
 * @returns {boolean} True if native Symbol support is available, false otherwise
 */

/**
 * Represents the result of checking for native Symbol support.
 * Returns true when the environment has genuine ES6 Symbol implementation.
 */
declare const hasNativeSymbolSupport: boolean;

export default hasNativeSymbolSupport;

/**
 * Type guard to check if Symbol is natively supported
 */
export type HasNativeSymbol = boolean;

/**
 * Symbol capability detection result
 * 
 * @remarks
 * This checks for:
 * - Existence of global Symbol object
 * - Absence of Symbol.sham property (indicating it's not a shim)
 * - typeof Symbol.iterator === 'symbol' (native implementation)
 */
export interface SymbolSupportCheck {
  /** Whether the environment has native Symbol support */
  readonly hasNativeSupport: boolean;
}