/**
 * Object.defineProperty polyfill module
 * 
 * This module extends the Object constructor with the defineProperty method
 * when native support is unavailable. It provides compatibility for older
 * JavaScript environments that don't support ES5 property descriptors.
 * 
 * @module ObjectDefinePropertyPolyfill
 */

/**
 * Core export utility interface
 * Handles feature detection and method registration
 */
interface CoreExports {
  /**
   * Static method flag - indicates the method should be attached to the constructor
   */
  S: number;
  
  /**
   * Forced flag - forces the polyfill even if native implementation exists
   */
  F: number;
  
  /**
   * Registers a method or property on a global object
   * 
   * @param flags - Bitwise flags controlling export behavior (S for static, F for forced)
   * @param target - Target object name (e.g., "Object", "Array")
   * @param exports - Methods/properties to export onto the target
   */
  (flags: number, target: string, exports: Record<string, unknown>): void;
}

/**
 * Property descriptor interface for Object.defineProperty
 */
interface PropertyDescriptor {
  /**
   * The value associated with the property
   */
  value?: unknown;
  
  /**
   * true if the value can be changed
   */
  writable?: boolean;
  
  /**
   * true if the property shows up during enumeration
   */
  enumerable?: boolean;
  
  /**
   * true if the descriptor can be changed or property can be deleted
   */
  configurable?: boolean;
  
  /**
   * Getter function for the property
   */
  get?(): unknown;
  
  /**
   * Setter function for the property
   */
  set?(value: unknown): void;
}

/**
 * Object.defineProperty implementation
 */
interface ObjectDefineProperty {
  /**
   * Defines a new property or modifies an existing property on an object
   * 
   * @param obj - The object on which to define the property
   * @param prop - The name or Symbol of the property to be defined or modified
   * @param descriptor - The descriptor for the property being defined or modified
   * @returns The object that was passed to the function
   * 
   * @example
   *