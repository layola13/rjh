/**
 * Type guard to check if a value is a function.
 * 
 * This module provides a function type check that handles the special case
 * of HTML DDA (Document.all) objects, which have unusual typeof behavior.
 * 
 * @module FunctionTypeCheck
 */

/**
 * Configuration object from the dependency module containing browser-specific flags.
 */
interface RuntimeConfig {
  /** Indicates if the environment supports HTML DDA (Document.all) behavior */
  IS_HTMLDDA: boolean;
  /** Reference to the document.all object (if supported) */
  all: unknown;
}

/**
 * Checks if a value is a function.
 * 
 * In environments that support HTML DDA (Document.all), this check also
 * treats the `document.all` object as a function due to its legacy behavior.
 * 
 * @param value - The value to check
 * @returns True if the value is a function (or document.all in legacy environments)
 * 
 * @example
 *