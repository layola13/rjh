/**
 * String.prototype.includes polyfill module
 * 
 * Provides ES6 String.includes functionality for older environments.
 * This module exports a polyfill that adds the includes method to String.prototype.
 * 
 * @module StringIncludesPolyfill
 */

/**
 * Options for exporting methods to global objects
 */
interface ExportOptions {
  /** Export to prototype */
  P?: boolean;
  /** Force export even if method exists */
  F?: boolean;
}

/**
 * Export utility function type
 * Adds methods to global constructors (String, Array, etc.)
 * 
 * @param options - Bit flags for export behavior (P for prototype, F for force)
 * @param targetConstructor - Name of the global constructor to extend
 * @param methods - Object containing methods to add
 */
type ExportFunction = (
  options: number,
  targetConstructor: string,
  methods: Record<string, Function>
) => void;

/**
 * Context converter utility
 * Converts 'this' context to a string and validates search string
 * 
 * @param context - The context object (typically 'this' in String methods)
 * @param searchString - The string to search for
 * @param methodName - Name of the method being called (for error messages)
 * @returns Converted string context
 */
type ContextConverter = (
  context: unknown,
  searchString: string,
  methodName: string
) => string;

/**
 * Method name validator
 * Checks if a method name is problematic in certain environments
 * 
 * @param methodName - The method name to validate
 * @returns True if the method name causes issues
 */
type MethodNameValidator = (methodName: string) => boolean;

/**
 * Polyfill for String.prototype.includes
 * 
 * Determines whether one string may be found within another string,
 * returning true or false as appropriate.
 * 
 * @param searchString - The string to search for
 * @param position - The position within the string to begin searching (default: 0)
 * @returns True if searchString is found, false otherwise
 */
interface StringIncludesMethod {
  (searchString: string, position?: number): boolean;
}

/**
 * String constructor with includes method
 */
interface StringConstructor {
  prototype: {
    includes: StringIncludesMethod;
  };
}

declare module 'string-includes-polyfill' {
  /**
   * Installs the String.prototype.includes polyfill
   * 
   * This function adds the includes method to String.prototype if not already present
   * or if forced. The method searches for a substring within a string.
   * 
   * @param exportFn - Function to export the polyfill to global scope
   * @param contextConverter - Utility to convert and validate context
   * @param methodNameValidator - Utility to check for problematic method names
   */
  export function install(
    exportFn: ExportFunction,
    contextConverter: ContextConverter,
    methodNameValidator: MethodNameValidator
  ): void;
}