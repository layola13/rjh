/**
 * Converts a value to a string, with special handling for Symbol types.
 * 
 * @module StringConversion
 * @description This module provides a safe string conversion utility that prevents
 * Symbol values from being converted to strings, which would cause runtime errors
 * in certain JavaScript contexts.
 */

/**
 * Type checking utility for determining the type of a value.
 * Typically returns string representations like "Symbol", "String", "Number", etc.
 */
declare function getTypeOf(value: unknown): string;

/**
 * Converts a value to a string representation.
 * 
 * @param value - The value to convert to a string
 * @returns The string representation of the value
 * @throws {TypeError} Throws when attempting to convert a Symbol to a string
 * 
 * @example
 *