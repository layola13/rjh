/**
 * Generates a unique symbol-like string identifier.
 * Creates a pseudo-symbol by combining a prefix, optional description, and a unique numeric suffix.
 * 
 * @module SymbolPolyfill
 * @description Polyfill implementation for creating unique symbol identifiers in environments
 * that don't support native ES6 Symbols. Uses a counter and random seed to ensure uniqueness.
 */

/**
 * Counter for generating sequential unique identifiers.
 * Incremented with each symbol creation to ensure uniqueness.
 */
let symbolCounter: number = 0;

/**
 * Random seed value used as part of the unique identifier generation.
 * Initialized once at module load time to provide additional uniqueness guarantees.
 */
const randomSeed: number = Math.random();

/**
 * Reference to the native Number.prototype.toString method.
 * Used to convert numbers to string representations in different bases (radix).
 */
const numberToString: (radix?: number) => string = (1).toString;

/**
 * Creates a unique symbol-like string identifier.
 * 
 * The generated string follows the format: "Symbol(description)_uniqueId"
 * where uniqueId is a base-36 encoded combination of an incrementing counter and random seed.
 * 
 * @param description - Optional description for the symbol. If undefined or not provided,
 *                      an empty string is used.
 * @returns A unique string in the format "Symbol(description)_base36hash"
 * 
 * @example
 *