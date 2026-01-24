/**
 * Global object detection module
 * Detects and exports the global object (window, self, or global context)
 * 
 * This module provides a cross-environment way to access the global object,
 * working in browsers (window), web workers (self), and other JavaScript environments.
 * 
 * @module GlobalObject
 */

/**
 * The global object for the current JavaScript environment.
 * 
 * Priority order:
 * 1. window (browser environment)
 * 2. self (web worker or browser)
 * 3. Function("return this")() (fallback for other environments)
 * 
 * @type {Window | WorkerGlobalScope | typeof globalThis}
 */
declare const globalObject: Window & typeof globalThis;

/**
 * Legacy global variable __g (if defined as number type)
 * This appears to be a side effect that overwrites __g with the global object
 * 
 * @deprecated This is likely legacy code from older module systems
 */
declare var __g: typeof globalObject | number | undefined;

export default globalObject;
export { globalObject, __g };