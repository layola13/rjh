/**
 * Global object detection utility
 * 
 * This module provides a reliable way to access the global object across different JavaScript environments
 * (browser, Node.js, Web Workers, etc.). It attempts multiple strategies to ensure compatibility.
 * 
 * @module GlobalObjectDetector
 */

/**
 * Retrieves the global object in a cross-environment compatible way.
 * 
 * Strategy:
 * 1. First attempts to use non-strict mode `this` to get global object
 * 2. Falls back to `new Function("return this")()` for strict mode contexts
 * 3. Final fallback to `window` object in browser environments
 * 
 * @returns The global object (globalThis, window, global, or self depending on environment)
 * 
 * @example
 *