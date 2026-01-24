/**
 * Native Symbol support detection module
 * 
 * Checks if the JavaScript environment has proper native Symbol implementation.
 * This includes verifying:
 * - Object.getOwnPropertySymbols API exists
 * - Symbol can be properly stringified
 * - Symbol instances maintain correct prototype chain
 * - No polyfill/shim is being used (Symbol.sham check)
 * - Chrome version compatibility (v41+)
 */

/**
 * Detects whether the environment has native Symbol support
 * 
 * @returns True if native Symbols are fully supported, false otherwise
 * 
 * @remarks
 * The detection performs the following checks:
 * 1. Verifies Object.getOwnPropertySymbols exists
 * 2. Creates a test Symbol and validates:
 *    - String conversion works
 *    - Boxed Symbol has correct prototype
 *    - Not a polyfill (no Symbol.sham property)
 * 3. Ensures Chrome version >= 41 if running in Chrome
 */
export declare const hasNativeSymbolSupport: boolean;

export default hasNativeSymbolSupport;