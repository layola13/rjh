/**
 * Array polyfill module
 * Adds Array.isArray static method to the Array constructor
 * @module ArrayIsArrayPolyfill
 */

/**
 * Polyfill registration function
 * Extends the Array constructor with the isArray static method
 * 
 * @param target - The polyfill registration utility
 * @param exports - Module exports (unused)
 * @param require - Module loader function
 */
declare function registerArrayIsArrayPolyfill(
  target: unknown,
  exports: unknown,
  require: ModuleRequire
): void;

/**
 * Module require function interface
 */
interface ModuleRequire {
  /**
   * Load a module by its ID
   * @param moduleId - The unique module identifier
   * @returns The module exports
   */
  (moduleId: string): unknown;
}

/**
 * Polyfill registration utility interface
 */
interface PolyfillRegistry {
  /**
   * Static method registration flag
   */
  readonly S: symbol | string;

  /**
   * Register a polyfill method on a target object
   * 
   * @param flags - Registration flags (e.g., S for static)
   * @param targetName - Name of the target constructor/object (e.g., "Array")
   * @param methods - Object containing methods to add
   */
  (flags: symbol | string, targetName: string, methods: Record<string, unknown>): void;
}

/**
 * Array.isArray polyfill implementation
 * Determines whether the passed value is an Array
 * 
 * @param value - The value to be checked
 * @returns true if the value is an Array, false otherwise
 */
declare function isArray(value: unknown): value is unknown[];

export { registerArrayIsArrayPolyfill, PolyfillRegistry, isArray };