/**
 * Type guard to check if a value is an object (including functions).
 * 
 * This module provides a robust object detection utility that handles special cases
 * like HTML DDA (Document.All) objects in legacy browsers.
 * 
 * @module ObjectTypeChecker
 */

/**
 * Checks if a value is callable (function).
 * Imported from module 52530.
 */
declare function isCallable(value: unknown): value is Function;

/**
 * Configuration object containing browser-specific flags and special values.
 * Imported from module 24866.
 */
declare const config: {
  /** Flag indicating if HTML DDA (Document.All) support is needed */
  IS_HTMLDDA: boolean;
  /** Reference to document.all in legacy browsers */
  all: unknown;
};

/**
 * Determines if a value is an object type (including functions and null-prototype objects).
 * 
 * In environments with HTML DDA support (legacy browsers with document.all):
 * - Returns true for non-null objects, functions, or the special document.all value
 * 
 * In modern environments:
 * - Returns true for non-null objects or functions
 * 
 * @param value - The value to check
 * @returns True if the value is an object type (excluding null), false otherwise
 * 
 * @example
 *