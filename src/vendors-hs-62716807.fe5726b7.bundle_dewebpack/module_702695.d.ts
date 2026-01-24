/**
 * Function name property detection utilities
 * 
 * This module provides information about the support and behavior of the `name`
 * property on Function.prototype in the current JavaScript environment.
 */

/**
 * Indicates whether the `name` property exists on Function.prototype
 * 
 * @remarks
 * Checks if functions have a native `name` property that reflects their declared name.
 */
export const EXISTS: boolean;

/**
 * Indicates whether the `name` property works correctly
 * 
 * @remarks
 * Tests if an anonymous function expression correctly reports its name.
 * Returns true if the name property is properly implemented according to spec.
 */
export const PROPER: boolean;

/**
 * Indicates whether the `name` property is configurable
 * 
 * @remarks
 * In modern environments with property descriptors, this checks if the `name`
 * property descriptor on Function.prototype has `configurable: true`.
 * In legacy environments without descriptor support, defaults to true.
 */
export const CONFIGURABLE: boolean;

/**
 * Function name property capabilities
 */
export interface FunctionNameSupport {
  /** Whether the name property exists on functions */
  EXISTS: boolean;
  /** Whether the name property works correctly per spec */
  PROPER: boolean;
  /** Whether the name property descriptor is configurable */
  CONFIGURABLE: boolean;
}

declare const functionNameSupport: FunctionNameSupport;
export default functionNameSupport;