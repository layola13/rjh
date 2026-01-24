/**
 * String case transformation utility module
 * 
 * This module provides a wrapped version of the `toUpperCase` string method.
 * It imports a string method wrapper utility and applies it to create
 * an uppercase transformation function.
 * 
 * @module StringUpperCase
 */

/**
 * Type definition for the string method wrapper factory function
 * Typically accepts a method name and returns a bound function
 */
type StringMethodWrapper = <T extends keyof String>(
  methodName: T
) => String[T] extends (...args: infer Args) => infer Return
  ? (...args: Args) => Return
  : never;

/**
 * Uppercase transformation function type
 * Converts a string to uppercase following locale-independent rules
 * 
 * @param str - The input string to transform
 * @returns The transformed string in uppercase
 */
type ToUpperCaseFunction = (str: string) => string;

/**
 * The exported uppercase transformation utility
 * 
 * This function converts a given string to uppercase characters.
 * It's a wrapped version of the native String.prototype.toUpperCase method.
 * 
 * @example
 *