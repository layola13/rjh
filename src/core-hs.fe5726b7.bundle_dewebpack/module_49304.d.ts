/**
 * Checks if Error.stack property is configurable and works correctly.
 * 
 * This module tests whether the JavaScript environment properly supports:
 * - The presence of the 'stack' property on Error objects
 * - The ability to redefine the 'stack' property using Object.defineProperty
 * - Correct behavior when setting custom values to the stack property
 * 
 * @module ErrorStackConfigurableCheck
 * @returns {boolean} True if Error.stack is properly configurable, false otherwise
 */

import type { PropertyDescriptor } from './types';

/**
 * Function that may throw or return an error during execution
 */
type ErrorTestFunction = () => boolean;

/**
 * Function to check if a feature fails (returns true on error/failure)
 */
type FeatureFailsCheck = (testFn: ErrorTestFunction) => boolean;

/**
 * Function to create a property descriptor
 */
type CreatePropertyDescriptor = (writable: number, value: number) => PropertyDescriptor;

/**
 * Indicates whether the Error.stack property is configurable and behaves correctly.
 * 
 * Returns false if:
 * - Error objects don't have a 'stack' property
 * - The 'stack' property cannot be redefined with Object.defineProperty
 * - Setting a custom value to 'stack' doesn't work as expected
 * 
 * Returns true if all checks pass and Error.stack works properly.
 */
declare const isErrorStackConfigurable: boolean;

export = isErrorStackConfigurable;

/**
 * Type definitions for supporting modules
 */
declare module './types' {
  /**
   * Property descriptor used with Object.defineProperty
   */
  export interface PropertyDescriptor {
    writable?: boolean;
    enumerable?: boolean;
    configurable?: boolean;
    value?: any;
  }
}