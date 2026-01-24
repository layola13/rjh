/**
 * Checks if Object.defineProperty works correctly in the current environment.
 * 
 * This module tests whether the JavaScript engine properly supports ES5's
 * Object.defineProperty by attempting to define a getter on an object and
 * verifying the returned value.
 * 
 * @module PropertyDescriptorSupport
 * @returns {boolean} true if Object.defineProperty works correctly, false otherwise
 */

import type { ErrorChecker } from './types';

/**
 * Type definition for the error checking function imported from module 679594.
 * This function executes a callback and returns true if it throws an error.
 */
declare const checkForErrors: ErrorChecker;

/**
 * Tests whether Object.defineProperty correctly handles property descriptors.
 * 
 * The test attempts to:
 * 1. Define a property with index 1 on an empty object
 * 2. Set a getter that returns the value 7
 * 3. Verify that accessing the property returns 7
 * 
 * @returns {boolean} true if the environment supports property descriptors correctly
 */
declare const supportsPropertyDescriptors: boolean;

export default supportsPropertyDescriptors;

/**
 * Supporting type definitions
 */
export interface PropertyDescriptor {
  /** Getter function for the property */
  get?: () => unknown;
  /** Setter function for the property */
  set?: (value: unknown) => void;
  /** The value of the property */
  value?: unknown;
  /** Whether the property can be changed or deleted */
  configurable?: boolean;
  /** Whether the property shows up during enumeration */
  enumerable?: boolean;
  /** Whether the value can be changed with an assignment operator */
  writable?: boolean;
}

/**
 * Error checker function type from dependency module 679594
 */
declare module './types' {
  export type ErrorChecker = (fn: () => unknown) => boolean;
}