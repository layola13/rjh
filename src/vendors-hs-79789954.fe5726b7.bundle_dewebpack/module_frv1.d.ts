/**
 * Global object detection module
 * 
 * Provides a reliable way to access the global object across different JavaScript environments
 * (browser, Node.js, Web Workers, etc.)
 */

/**
 * Gets the global object in a cross-environment compatible way.
 * 
 * This function attempts multiple strategies to obtain the global object:
 * 1. Direct `this` reference in non-strict mode
 * 2. `Function` constructor evaluation (works in most environments)
 * 3. Fallback to `window` object (browser environment)
 * 
 * @returns The global object (globalThis, window, global, or self depending on environment)
 * 
 * @example
 *