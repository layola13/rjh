/**
 * Object.assign polyfill module
 * 
 * Provides a fallback implementation of Object.assign for environments
 * that don't support it natively or have buggy implementations.
 * 
 * @module ObjectAssignPolyfill
 */

/**
 * Copies all enumerable own properties from one or more source objects to a target object.
 * Returns the target object.
 * 
 * @template T - The type of the target object
 * @template U - The type of the source objects
 * @param target - The target object to copy properties to
 * @param sources - One or more source objects from which to copy properties
 * @returns The target object with properties copied from sources
 * 
 * @example
 *