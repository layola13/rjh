/**
 * Function name property detection and configuration module
 * 
 * This module checks the support and configurability of the Function.prototype.name property
 * across different JavaScript environments.
 */

/**
 * Result of function name property detection
 */
export interface FunctionNameDescriptor {
  /**
   * Indicates whether the 'name' property exists on Function.prototype
   */
  EXISTS: boolean;

  /**
   * Indicates whether the 'name' property works properly
   * (i.e., function expressions have the correct name)
   */
  PROPER: boolean;

  /**
   * Indicates whether the 'name' property descriptor is configurable
   * (can be modified or deleted)
   */
  CONFIGURABLE: boolean;
}

/**
 * Detects the availability and configurability of the Function.prototype.name property
 * 
 * @remarks
 * This is useful for polyfills and compatibility layers that need to know:
 * - If the name property exists at all (EXISTS)
 * - If it correctly captures function names (PROPER)
 * - If it can be modified via Object.defineProperty (CONFIGURABLE)
 * 
 * @example
 *