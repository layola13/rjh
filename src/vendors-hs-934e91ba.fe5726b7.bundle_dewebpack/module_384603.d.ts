/**
 * Sets or overrides the toString method of an object with a custom implementation.
 * This utility provides a cross-environment way to define a non-enumerable toString method.
 * 
 * @module OverrideToString
 */

/**
 * Creates a function that always returns the same value when called.
 * Imported from module 269547.
 */
type ConstantFunction = (value: any) => () => any;

/**
 * Defines a property on an object with specific descriptor attributes.
 * Imported from module 165476.
 * 
 * @param obj - The target object
 * @param key - The property key to define
 * @param descriptor - Property descriptor attributes
 * @returns The modified object
 */
type DefineProperty = (
  obj: any,
  key: PropertyKey,
  descriptor: PropertyDescriptor
) => any;

/**
 * Identity function that returns its input unchanged.
 * Used as a fallback when defineProperty is not available.
 * Imported from module 843509.
 */
type Identity = <T>(value: T) => T;

/**
 * Overrides the toString method of an object with a custom implementation.
 * If Object.defineProperty is available, creates a non-enumerable, configurable,
 * and writable toString property. Otherwise, falls back to identity function.
 * 
 * @param target - The object whose toString method will be overridden
 * @param toStringFunc - The custom toString implementation to apply
 * @returns The modified target object, or the toStringFunc if defineProperty is unavailable
 */
declare function overrideToString<T extends object>(
  target: T,
  toStringFunc: () => string
): T;

export = overrideToString;