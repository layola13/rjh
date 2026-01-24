/**
 * Gets the internal [[Class]] name of a value in a cross-environment compatible way.
 * 
 * This module provides a robust way to determine the type of JavaScript values,
 * handling edge cases like Arguments objects and values with custom toStringTag symbols.
 * 
 * @module ClassofModule
 */

/**
 * Determines if the environment natively supports toStringTag symbol
 */
declare const hasNativeToStringTag: boolean;

/**
 * Built-in Object.prototype.toString based type detection
 */
declare const getInternalClass: (value: unknown) => string;

/**
 * Checks if a value is a callable function
 */
declare const isCallable: (value: unknown) => value is Function;

/**
 * The toStringTag symbol used for custom type representations
 */
declare const toStringTagSymbol: symbol;

/**
 * Checks if the current environment correctly identifies Arguments objects
 */
declare const hasWorkingArguments: boolean;

/**
 * Safely retrieves a property from an object without throwing
 * 
 * @param target - The object to read from
 * @param key - The property key to access
 * @returns The property value or undefined if access fails
 */
declare function tryGetProperty(target: object, key: PropertyKey): unknown;

/**
 * Gets the accurate type classification of any JavaScript value.
 * 
 * Returns standardized type names:
 * - Primitive types: "Undefined", "Null", "String", "Number", "Boolean", "Symbol", "BigInt"
 * - Object types: "Object", "Array", "Function", "Arguments", "Date", "RegExp", etc.
 * - Custom types via Symbol.toStringTag if present
 * 
 * @param value - The value to classify
 * @returns A string representing the value's type
 * 
 * @example
 * classof([]) // "Array"
 * classof(new Date()) // "Date"
 * classof((function() { return arguments })()) // "Arguments"
 */
declare function classof(value: unknown): string;

/**
 * Main export: either uses native toStringTag support or provides polyfill
 */
export = hasNativeToStringTag ? getInternalClass : classof;