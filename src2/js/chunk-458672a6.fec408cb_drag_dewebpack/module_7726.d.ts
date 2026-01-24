/**
 * Global object detection module
 * 
 * This module provides a safe way to access the global object across different JavaScript environments.
 * It attempts to detect and return the global object by checking multiple potential sources:
 * - Browser environment: `window`
 * - Web Worker environment: `self`
 * - Fallback: Uses Function constructor to access global scope
 * 
 * @module GlobalObjectDetector
 */

/**
 * The global object reference that works across different JavaScript environments.
 * This can be `window` (browser), `self` (web worker), or the global scope object.
 */
declare const globalObject: typeof globalThis;

/**
 * Legacy global variable that may be set in older environments.
 * If this variable exists and is a number type, it will be reassigned to the detected global object.
 * 
 * @deprecated This is a legacy global variable from older module systems
 */
declare var __g: any;

export { globalObject, __g };
export default globalObject;