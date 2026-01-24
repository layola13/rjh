/**
 * Global object detection utility
 * 
 * Detects and returns the global object in different JavaScript environments
 * (browser, Node.js, Web Workers, etc.)
 * 
 * @module GlobalObjectDetector
 */

/**
 * Type guard function that checks if a value is a valid global object
 * by verifying it has a Math property that references the global Math object
 * 
 * @param candidate - The value to check as a potential global object
 * @returns The candidate if it's a valid global object, otherwise undefined
 */
declare function isValidGlobalObject(candidate: unknown): typeof globalThis | undefined;

/**
 * The detected global object for the current JavaScript environment
 * 
 * Detection order:
 * 1. globalThis (ES2020+ standard)
 * 2. window (browser environment)
 * 3. self (Web Workers, Service Workers)
 * 4. global (Node.js, Webpack global)
 * 5. Function context (legacy fallback)
 * 6. Function constructor (last resort fallback)
 * 
 * @remarks
 * This module provides cross-environment compatibility for accessing
 * the global object before the globalThis standard was widely adopted.
 */
declare const detectedGlobal: typeof globalThis;

export = detectedGlobal;