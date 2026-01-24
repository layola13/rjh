/**
 * Type guard to check if a value is a symbol.
 * 
 * @remarks
 * This module provides two implementations:
 * - In environments with native symbol support: uses `typeof` operator
 * - In environments without native symbol support: checks prototype chain against Symbol.prototype
 * 
 * @param value - The value to check
 * @returns True if the value is a symbol, false otherwise
 * 
 * @example
 *