/**
 * Compression worker factory module
 * 
 * This module provides a factory function for creating Web Workers
 * that handle compression operations in a separate thread.
 */

/**
 * Creates and returns a new Web Worker instance for compression tasks.
 * 
 * The worker is loaded from a bundled JavaScript file that handles
 * compression operations off the main thread to prevent UI blocking.
 * 
 * @returns A new Worker instance configured for compression operations
 * 
 * @example
 *