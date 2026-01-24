/**
 * Conditionally applies a transformation function to an object using specified properties.
 * 
 * This module provides a utility function that conditionally invokes a property iteration
 * function on a given object when both the object and transformer are truthy.
 * 
 * @module ObjectPropertyTransformer
 */

/**
 * Type representing a function that iterates over object properties.
 * @template T - The type of the target object
 * @template K - The type of the property keys to iterate
 */
type PropertyIterator<T, K extends keyof any> = (
  target: T,
  keys: K[],
) => T | void;

/**
 * Type representing a function that extracts keys from an object.
 * @template T - The type of the source object
 */
type KeyExtractor<T> = (source: T) => Array<keyof T>;

/**
 * Conditionally applies property transformation to an object.
 * 
 * @template T - The type of the target object
 * @param target - The object to transform
 * @param propertyIterator - Function that iterates over object properties and applies transformations
 * @param keyExtractor - Function that extracts the keys to be processed from the target object
 * @returns The transformed object if all parameters are truthy, undefined otherwise
 * 
 * @example
 *