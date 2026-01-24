/**
 * Global object detection utility
 * 
 * This module provides a cross-environment way to access the global object.
 * It attempts to detect the global object in different JavaScript environments
 * (browser, Node.js, Web Workers, etc.) and falls back to legacy methods if needed.
 * 
 * @module GlobalObject
 */

/**
 * Checks if a value is a valid global object by verifying it has the Math property
 * 
 * @param candidate - The potential global object to check
 * @returns The candidate if it's a valid global object, otherwise undefined
 */
declare function isValidGlobal(candidate: unknown): typeof globalThis | undefined;

/**
 * The detected global object for the current JavaScript environment.
 * 
 * Attempts detection in the following order:
 * 1. globalThis (ES2020 standard global object)
 * 2. window (browser environment)
 * 3. self (Web Workers, Service Workers)
 * 4. global (Node.js environment)
 * 5. this in non-strict mode (legacy fallback)
 * 6. Function constructor evaluation (ultimate fallback)
 * 
 * @example
 *