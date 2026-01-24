/**
 * CSS URL utility module for handling URL values in stylesheets.
 * Provides functionality to process and quote URLs when necessary.
 * @module CSSURLHelper
 */

/**
 * Options for configuring URL processing behavior.
 */
export interface URLProcessOptions {
  /** Hash fragment to append to the URL (e.g., "#anchor") */
  hash?: string;
  
  /** Force the URL to be wrapped in quotes regardless of content */
  needQuotes?: boolean;
}

/**
 * Input value that may be an ES module with a default export.
 */
export interface ModuleValue {
  /** Indicates if the value is from an ES module */
  __esModule?: boolean;
  
  /** The default export value if this is an ES module */
  default?: string;
  
  /** Allow string conversion via toString */
  toString(): string;
}

/**
 * Processes and formats a URL value for use in CSS.
 * 
 * This function:
 * - Extracts the default export if the input is an ES module
 * - Removes surrounding quotes if present
 * - Appends an optional hash fragment
 * - Adds quotes when the URL contains special characters or when explicitly requested
 * - Escapes internal quotes and newlines when quoting
 * 
 * @param url - The URL value to process (string or module with default export)
 * @param options - Configuration options for URL processing
 * @returns The formatted URL string, properly quoted if necessary, or the original value if falsy
 * 
 * @example
 *