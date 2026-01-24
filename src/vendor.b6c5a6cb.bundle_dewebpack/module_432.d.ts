/**
 * Global object detection utility
 * 
 * Detects and returns the global object in different JavaScript environments:
 * - Browser: window or self
 * - Node.js: global or globalThis
 * - Web Worker: self
 * - Modern environments: globalThis
 * 
 * @module GlobalObjectDetector
 */

/**
 * Type guard function to check if a value is an object type
 * This would be the imported function from module 426
 */
type TypeChecker = (value: unknown) => string;

/**
 * Webpack global reference (fallback for older webpack versions)
 */
interface WebpackGlobal {
  g?: typeof globalThis;
}

/**
 * Retrieves the global object for the current JavaScript environment
 * 
 * Detection priority:
 * 1. globalThis (ES2020+)
 * 2. this context or Function constructor
 * 3. window (browser)
 * 4. self (web worker/browser)
 * 5. webpack global (e.g)
 * 
 * @param typeChecker - Function to check if value is an object (typically checks typeof)
 * @param webpackExports - Webpack exports object containing potential global reference
 * @returns The detected global object
 * 
 * @example
 * const global = getGlobalObject(typeOf, webpackExports);
 * global.console.log('Hello from any environment');
 */
declare function getGlobalObject(
  typeChecker: TypeChecker,
  webpackExports: WebpackGlobal
): typeof globalThis;

export = getGlobalObject;