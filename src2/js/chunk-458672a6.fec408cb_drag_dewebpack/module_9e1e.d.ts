/**
 * Detects if Object.defineProperty is fully supported in the current environment.
 * 
 * This module tests whether the engine correctly implements ES5 Object.defineProperty
 * by attempting to define a getter and verifying the returned value matches expectations.
 * 
 * @module PropertyDescriptorSupport
 * @returns {boolean} True if Object.defineProperty works correctly, false otherwise
 */

import { testEnvironmentFeature } from './79e5';

/**
 * Checks if Object.defineProperty with getter functions works as expected.
 * 
 * The test creates an object with a property 'a' that has a getter returning 7,
 * then verifies that accessing the property returns 7. If this fails, the
 * environment doesn't properly support property descriptors.
 */
declare const isDefinePropertySupported: boolean;

export default isDefinePropertySupported;

/**
 * Type definition for the feature detection test function.
 * Tests if a getter defined via Object.defineProperty returns the correct value.
 */
export type DefinePropertyTest = () => boolean;

/**
 * Configuration object for Object.defineProperty descriptor test.
 */
export interface PropertyDescriptorConfig {
  /**
   * Getter function that should return the value 7
   */
  get: () => number;
}

/**
 * Test object structure used for property descriptor validation.
 */
export interface TestObject {
  /**
   * Property 'a' defined with a getter, expected to return 7
   */
  a?: number;
}