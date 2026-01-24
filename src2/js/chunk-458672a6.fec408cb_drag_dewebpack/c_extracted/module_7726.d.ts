/**
 * Global object detection utility
 * 
 * Detects and exports the global object in different JavaScript environments:
 * - Browser: window
 * - Web Worker: self
 * - Node.js/Other: Function constructor fallback
 * 
 * Also handles legacy __g global marker if present.
 * 
 * @module GlobalObjectDetection
 */

/**
 * The detected global object for the current JavaScript environment.
 * Prioritizes window (browser), then self (worker), then falls back to Function constructor.
 */
declare const globalObject: Window | WorkerGlobalScope | typeof globalThis;

/**
 * Legacy global marker variable.
 * If defined as a number type, it will be assigned to the detected global object.
 */
declare let __g: number | Window | WorkerGlobalScope | typeof globalThis | undefined;

export default globalObject;
export { __g };