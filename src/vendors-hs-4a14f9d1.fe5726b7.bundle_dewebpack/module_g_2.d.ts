/**
 * Module: module__G
 * Original ID: %G
 * 
 * This module appears to export a function that transforms input through function 'h'.
 * The exact nature of the transformation depends on the implementation of 'h'.
 */

/**
 * Transforms the input value using function h
 * @param input - The input value to be transformed
 * @returns The transformed result from function h
 * @template T - The type of the input parameter
 * @template R - The return type from function h
 */
declare function moduleG<T, R>(input: T): R;

/**
 * Helper function that performs the actual transformation
 * @param value - The value to transform
 * @returns The transformed value
 * @template T - The type of the input parameter
 * @template R - The return type
 */
declare function h<T, R>(value: T): R;

export default moduleG;
export { h };