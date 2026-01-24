/**
 * Type guard function that checks if a value is an object or function.
 * 
 * @remarks
 * This function returns true for:
 * - Non-null objects (including arrays, dates, etc.)
 * - Functions (including classes, arrow functions, etc.)
 * 
 * Returns false for:
 * - Primitives (string, number, boolean, symbol, bigint)
 * - null
 * - undefined
 * 
 * @param value - The value to check
 * @returns True if the value is an object (excluding null) or a function, false otherwise
 * 
 * @example
 *