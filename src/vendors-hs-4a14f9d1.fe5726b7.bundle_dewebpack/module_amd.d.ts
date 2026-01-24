/**
 * AMD Module Generator
 * Generates AMD (Asynchronous Module Definition) module wrapper code
 */

/**
 * Options for AMD module generation
 */
interface AMDModuleOptions {
  /** Map of dependency aliases to module paths */
  dependencies: Record<string, string>;
}

/**
 * AMD Module Generator Function
 * Creates an AMD-compliant module definition with specified dependencies
 * 
 * @param options - Configuration options for the AMD module
 * @param t - Function that generates the module header/preamble
 * @param e - Function that generates the module exports expression
 * @param A - Module body content to be indented
 * @param indent2 - Function to apply indentation to code blocks
 * @returns Generated AMD module code as a string
 */
declare function generateAMDModule(
  options: AMDModuleOptions,
  t: () => string,
  e: () => string,
  A: string,
  indent2: (content: string) => string
): string;

/**
 * Utility objects for value/key extraction
 */
declare namespace objects {
  /**
   * Extract all values from an object
   * @param obj - Source object
   * @returns Array of object values
   */
  function values<T>(obj: Record<string, T>): T[];

  /**
   * Extract all keys from an object
   * @param obj - Source object
   * @returns Array of object keys
   */
  function keys<T>(obj: Record<string, T>): string[];
}

/**
 * Utility functions for array operations
 */
declare namespace arrays {
  /**
   * Map array elements with a transformation function
   * @param arr - Source array
   * @param fn - Transformation function
   * @returns Transformed array
   */
  function map<T, U>(arr: T[], fn: (item: T) => U): U[];
}

/**
 * JavaScript code generation utilities
 */
declare namespace js {
  /**
   * Escape a string for safe inclusion in JavaScript code
   * @param str - String to escape
   * @returns Escaped string suitable for JS string literals
   */
  function stringEscape(str: string): string;
}

export { generateAMDModule, AMDModuleOptions, objects, arrays, js };