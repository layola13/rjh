/**
 * String.prototype.includes polyfill module
 * 
 * Adds the `includes` method to String prototype for checking if a string
 * contains a specified substring.
 * 
 * @module StringIncludesPolyfill
 */

/**
 * Options for exporting to the target object
 */
interface ExportOptions {
  /** Export to prototype */
  P?: boolean;
  /** Force export even if method exists */
  F?: boolean;
}

/**
 * Exports a method to the specified target object
 * 
 * @param options - Export options (P for prototype, F for force)
 * @param targetName - Name of the target object (e.g., "String")
 * @param methods - Object containing methods to export
 */
declare function exportToTarget(
  options: number,
  targetName: string,
  methods: Record<string, Function>
): void;

/**
 * Converts the context to a string and validates the search string
 * 
 * @param context - The string context (this value)
 * @param searchString - The string to search for
 * @param methodName - Name of the method being called
 * @returns The validated string
 */
declare function toStringAndValidate(
  context: unknown,
  searchString: string,
  methodName: string
): string;

/**
 * Checks if a method name should be excluded from shimming
 * 
 * @param methodName - The name of the method to check
 * @returns True if the method should be excluded
 */
declare function shouldExcludeMethod(methodName: string): boolean;

declare global {
  interface String {
    /**
     * Determines whether a string contains a specified substring
     * 
     * @param searchString - The string to search for
     * @param position - The position within the string to start searching (default: 0)
     * @returns True if the search string is found, false otherwise
     */
    includes(searchString: string, position?: number): boolean;
  }
}

export {};