/**
 * Polyfill module for Object.prototype.toString
 * Ensures consistent toString behavior across different environments
 * 
 * @module ObjectToStringPolyfill
 */

/**
 * Checks if native Object.prototype.toString is correctly implemented
 */
declare const hasCorrectToString: boolean;

/**
 * Redefines a property on an object with the given descriptor options
 * 
 * @param target - The target object to modify
 * @param propertyName - The name of the property to redefine
 * @param implementation - The new implementation function
 * @param options - Configuration options for the property definition
 * @param options.unsafe - If true, allows unsafe property redefinition
 */
declare function redefineProperty(
  target: object,
  propertyName: string,
  implementation: Function,
  options: { unsafe: boolean }
): void;

/**
 * The correct toString implementation to be used as polyfill
 * 
 * @param this - The object to convert to string
 * @returns A string representation of the object in format "[object Type]"
 */
declare function toStringImplementation(this: unknown): string;

/**
 * Applies the Object.prototype.toString polyfill if needed
 * Only applies the polyfill when the native implementation is incorrect
 */
declare function applyObjectToStringPolyfill(): void;

export { hasCorrectToString, redefineProperty, toStringImplementation, applyObjectToStringPolyfill };