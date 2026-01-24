/**
 * String.prototype.startsWith polyfill module
 * 
 * Provides a polyfill implementation for the ES6 String.prototype.startsWith method.
 * This polyfill checks if a string starts with another string at a given position.
 * 
 * @module StringStartsWithPolyfill
 */

/**
 * Options for polyfill installation
 */
interface PolyfillOptions {
  /** Prototype method flag */
  P: number;
  /** Force override flag */
  F: number;
}

/**
 * Core polyfill export function interface
 */
interface CoreExportFunction {
  (flags: number, target: string, methods: Record<string, Function>): void;
  P: number;
  F: number;
}

/**
 * Converts a value to a positive integer (length)
 * @param value - The value to convert to a length
 * @returns The normalized length value
 */
declare function toLength(value: unknown): number;

/**
 * Converts the context to a string and validates against search string
 * @param context - The this context (string to search in)
 * @param searchString - The string being searched for
 * @param methodName - The name of the method being called
 * @returns The validated string context
 */
declare function validateStringCoercion(
  context: unknown,
  searchString: unknown,
  methodName: string
): string;

/**
 * Checks if the method name fails certain conditions (e.g., RegExp issues)
 * @param methodName - The method name to check
 * @returns True if the method should not be polyfilled
 */
declare function shouldFailPolyfill(methodName: string): boolean;

/**
 * Core export/polyfill installation function
 */
declare const coreExport: CoreExportFunction;

/**
 * String.prototype.startsWith polyfill implementation
 * 
 * Determines whether a string begins with the characters of a specified string,
 * returning true or false as appropriate.
 * 
 * @param searchString - The characters to be searched for at the start of this string
 * @param position - The position in this string at which to begin searching (default: 0)
 * @returns True if the string starts with searchString at the given position, false otherwise
 */
interface StringStartsWithPolyfill {
  (this: string, searchString: string, position?: number): boolean;
}

declare global {
  interface String {
    /**
     * Returns true if the sequence of elements of searchString converted to a String is the
     * same as the corresponding elements of this object (converted to a String) starting at
     * position. Otherwise returns false.
     * 
     * @param searchString - The string to search for
     * @param position - The position to start searching from (default: 0)
     */
    startsWith(searchString: string, position?: number): boolean;
  }
}

/**
 * Installs the startsWith polyfill on String.prototype if needed
 */
export function installStartsWithPolyfill(): void;

/**
 * The method name constant
 */
export const METHOD_NAME: "startsWith";

/**
 * Native startsWith implementation reference (if available)
 */
export const nativeStartsWith: ((searchString: string, position?: number) => boolean) | undefined;

export {};