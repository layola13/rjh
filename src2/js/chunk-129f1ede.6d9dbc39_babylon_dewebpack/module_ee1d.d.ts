/**
 * Number.isNaN polyfill module
 * 
 * Extends the global Number object with the isNaN static method.
 * This method determines whether the passed value is NaN (Not-a-Number).
 * 
 * @module NumberIsNaNPolyfill
 */

/**
 * Export function interface for module loader
 * 
 * @param exports - Module exports object
 * @param moduleContext - Module context (unused)
 * @param moduleImporter - Module import function for loading dependencies
 */
declare function moduleExport(
  exports: Record<string, unknown>,
  moduleContext: unknown,
  moduleImporter: (moduleId: string) => ModuleExportsInterface
): void;

/**
 * Module exports interface for the core polyfill library (module id: "5ca1")
 */
interface ModuleExportsInterface {
  /**
   * Static property flag constant
   */
  readonly S: number;
  
  /**
   * Registers a polyfill method on a global object
   * 
   * @param flags - Export flags (S for static, P for prototype, etc.)
   * @param targetName - Name of the global object to extend (e.g., "Number", "Array")
   * @param methods - Object containing method names and their implementations
   */
  (flags: number, targetName: string, methods: Record<string, Function>): void;
}

/**
 * Number.isNaN polyfill implementation
 * 
 * Determines whether the passed value is NaN by checking if the value
 * is not equal to itself (NaN is the only value in JavaScript that is not equal to itself).
 * 
 * @param value - The value to be tested for NaN
 * @returns true if the value is NaN, false otherwise
 * 
 * @example
 * Number.isNaN(NaN);        // true
 * Number.isNaN(undefined);  // false
 * Number.isNaN(null);       // false
 * Number.isNaN("string");   // false
 */
declare namespace Number {
  function isNaN(value: unknown): boolean;
}

export = moduleExport;