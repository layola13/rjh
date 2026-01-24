/**
 * Exports a native function toString implementation.
 * 
 * This module retrieves and exports the native `Function.prototype.toString` method
 * using a shared storage mechanism, ensuring consistent access to the original
 * native implementation across the application.
 * 
 * @module NativeFunctionToString
 */

import type { SharedStorage } from './shared-storage';

/**
 * Native Function.prototype.toString method type.
 * Represents the original, unmodified toString implementation for functions.
 */
export type NativeFunctionToString = typeof Function.prototype.toString;

/**
 * Retrieves the native Function.prototype.toString method from shared storage.
 * 
 * This ensures that even if Function.prototype.toString is modified elsewhere,
 * the original native implementation remains accessible.
 * 
 * @returns The native Function.prototype.toString method
 */
declare const getNativeFunctionToString: () => NativeFunctionToString;

export default getNativeFunctionToString();