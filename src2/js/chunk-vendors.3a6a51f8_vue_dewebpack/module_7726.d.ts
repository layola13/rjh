/**
 * Global object detection module
 * 
 * Detects and exports the global object in different JavaScript environments:
 * - Browser: window
 * - Web Worker: self
 * - Node.js/Other: Function constructor fallback
 * 
 * @module GlobalObjectDetection
 */

/**
 * The global object reference for the current JavaScript environment.
 * 
 * Priority order:
 * 1. window (browser environment)
 * 2. self (web worker environment)
 * 3. Function("return this")() (fallback for other environments)
 * 
 * @remarks
 * This module also updates the legacy `__g` global variable if it exists
 * and is of type number.
 */
declare const globalObject: typeof globalThis;

/**
 * Legacy global reference variable (deprecated).
 * 
 * @deprecated This variable is set for backward compatibility only.
 * @internal
 */
declare var __g: typeof globalThis | number;

export default globalObject;
export { __g };