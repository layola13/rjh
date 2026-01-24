/**
 * Creates a clone of an ArrayBuffer or Buffer.
 * 
 * @module ArrayBufferCloner
 * @remarks
 * This module provides functionality to clone ArrayBuffer-like objects,
 * with special handling for Node.js Buffer instances when available.
 */

/**
 * Clones an ArrayBuffer or Buffer instance.
 * 
 * @template T - The type of the buffer being cloned (extends Uint8Array)
 * @param buffer - The buffer to clone
 * @param shouldSlice - If true, uses slice() method for cloning; otherwise creates a new instance and copies data
 * @returns A new buffer instance containing the same data as the original
 * 
 * @example
 *