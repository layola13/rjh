/**
 * Buffer type checking utility module
 * Provides a safe way to check if a value is a Buffer instance
 */

import type { Buffer } from 'buffer';

/**
 * Checks if a value is a Node.js Buffer instance
 * 
 * @param value - The value to check
 * @returns True if the value is a Buffer, false otherwise
 * 
 * @remarks
 * This function safely detects Buffer instances across different execution contexts.
 * It falls back to a no-op function when Buffer is not available (e.g., in browsers).
 * 
 * @example
 *