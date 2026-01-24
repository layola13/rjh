/**
 * Checks if the native WeakMap implementation is available and not polyfilled.
 * 
 * This module verifies that:
 * 1. WeakMap exists and is callable
 * 2. The WeakMap implementation contains "native code" in its string representation
 * 
 * @module WeakMapNativeCheck
 * @returns {boolean} True if native WeakMap is available, false otherwise
 */

/**
 * Determines whether the environment supports native WeakMap.
 * Native implementations typically have "[native code]" in their toString() output.
 */
declare const isNativeWeakMapSupported: boolean;

export default isNativeWeakMapSupported;

/**
 * Type representing a callable check function.
 * Imported from module 170452 - likely checks if a value is callable/function.
 */
type IsCallable = (value: unknown) => boolean;

/**
 * Reference to the global WeakMap constructor.
 * Imported from module 339192 - likely the runtime's global object accessor.
 */
type WeakMapConstructor = WeakMapConstructor | undefined;