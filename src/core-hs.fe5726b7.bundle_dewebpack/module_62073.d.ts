/**
 * Set.prototype.isDisjointFrom polyfill registration module
 * 
 * This module registers a polyfill for the Set.prototype.isDisjointFrom method
 * if it's not natively supported in the current environment.
 */

import type { PolyfillRegistrationFunction } from './polyfill-types';
import type { IsDisjointFromImplementation } from './set-methods';

/**
 * Dependencies imported from other modules
 */
declare module './polyfill-registry' {
  /**
   * Registers a polyfill for a specific target object and method
   * 
   * @param config - Configuration object for polyfill registration
   * @param config.target - The target object to polyfill (e.g., "Set", "Array")
   * @param config.proto - Whether to add to the prototype (true) or static (false)
   * @param config.real - Whether this is a real ES specification feature
   * @param config.forced - Whether to force the polyfill even if native implementation exists
   * @param methods - Object containing method implementations to register
   */
  export function registerPolyfill(
    config: PolyfillRegistrationConfig,
    methods: Record<string, unknown>
  ): void;
}

declare module './set-methods' {
  /**
   * Implementation of Set.prototype.isDisjointFrom
   * Checks if this set has no elements in common with another set
   * 
   * @param other - The set to compare with
   * @returns true if the sets have no elements in common, false otherwise
   */
  export function isDisjointFrom<T>(
    this: Set<T>,
    other: Set<T> | Iterable<T>
  ): boolean;
}

declare module './feature-detection' {
  /**
   * Checks if a native implementation of a method exists
   * 
   * @param methodName - The name of the method to check
   * @returns true if the method exists natively, false otherwise
   */
  export function hasNativeImplementation(methodName: string): boolean;
}

/**
 * Configuration for polyfill registration
 */
export interface PolyfillRegistrationConfig {
  /** The target constructor or object name (e.g., "Set", "Map", "Array") */
  target: string;
  
  /** If true, add to prototype; if false, add as static method */
  proto: boolean;
  
  /** If true, this is a real ECMAScript specification feature */
  real: boolean;
  
  /** If true, force registration even if native implementation exists */
  forced: boolean;
}

/**
 * Registers the isDisjointFrom polyfill for Set.prototype
 * This method is part of the Set Methods proposal (ES2024+)
 */
export declare function registerIsDisjointFromPolyfill(): void;