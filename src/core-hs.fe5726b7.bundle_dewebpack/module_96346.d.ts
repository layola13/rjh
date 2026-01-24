/**
 * Converts a value to an object, with special handling for strings.
 * 
 * This utility provides a cross-browser compatible way to handle object conversion,
 * particularly addressing issues with string enumeration in older environments.
 * 
 * @module ObjectConversion
 */

/**
 * Converts a value to an object. If the value is a string and the environment
 * doesn't properly enumerate string indices, splits it into an array.
 * Otherwise, uses the standard Object constructor.
 * 
 * @param value - The value to convert to an object
 * @returns The converted object, or an array of characters if the input is a string
 * 
 * @example
 * // In environments with enumeration issues:
 * toObject("hello") // returns ["h", "e", "l", "l", "o"]
 * 
 * // In modern environments:
 * toObject("hello") // returns String object
 */
export type ToIndexedObject = (value: unknown) => object | string[];

/**
 * Type guard to check if a value is classified as a String type
 */
export type ClassifyType = (value: unknown) => string;

/**
 * Type for checking if a function fails (throws or returns false)
 */
export type FailsCheck = (fn: () => unknown) => boolean;

/**
 * Type for native string split method
 */
export type StringSplit = (str: string, separator: string) => string[];

/**
 * Configuration interface for the module dependencies
 */
export interface ModuleDependencies {
  /** Utility to access native methods */
  getNativeMethod: (methodPath: string) => StringSplit;
  
  /** Checks if a function execution fails */
  fails: FailsCheck;
  
  /** Classifies the internal type of a value */
  classifyType: ClassifyType;
}

/**
 * The main export: a function that converts values to objects with fallback logic
 */
declare const toIndexedObject: ToIndexedObject;

export default toIndexedObject;