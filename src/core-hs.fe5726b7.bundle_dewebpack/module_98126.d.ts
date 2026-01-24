/**
 * Detects native Symbol support in the JavaScript environment.
 * 
 * This module checks whether the runtime has proper Symbol implementation by verifying:
 * - Object.getOwnPropertySymbols exists
 * - Symbol instances can be properly stringified
 * - Symbol instances maintain their type when wrapped in Object()
 * - No shim/polyfill is being used (Symbol.sham is falsy)
 * - Engine version compatibility (not a known broken version < 41)
 * 
 * @module SymbolDetection
 */

/**
 * Indicates whether the environment has native, working Symbol support.
 * 
 * Returns `true` if all of the following conditions are met:
 * - `Object.getOwnPropertySymbols` is available
 * - Symbols can be converted to strings
 * - `Object(symbol)` returns a Symbol wrapper object
 * - No Symbol polyfill is detected (Symbol.sham is not set)
 * - Engine version is compatible (version >= 41 or version info unavailable)
 * 
 * @returns {boolean} `true` if native Symbols are fully supported, `false` otherwise
 */
export declare const hasNativeSymbolSupport: boolean;

export default hasNativeSymbolSupport;