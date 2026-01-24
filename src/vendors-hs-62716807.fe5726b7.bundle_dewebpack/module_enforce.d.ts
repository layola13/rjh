/**
 * Module: module_enforce
 * Enforces validation or transformation on input data
 * 
 * @module enforce
 */

/**
 * Enforces a specific operation on the input value.
 * If the value passes a validation check, applies transformation `a`,
 * otherwise applies transformation `r` with default options.
 * 
 * @template T - The input value type
 * @template R - The return value type
 * @param value - The value to enforce operations on
 * @returns The transformed result
 */
declare function enforce<T = unknown, R = unknown>(value: T): R;

export default enforce;

/**
 * Alternative named export
 */
export { enforce };

/**
 * Type guard or validation function
 * @internal
 */
type ValidationFunction<T> = (value: T) => boolean;

/**
 * Transformation function for validated values
 * @internal
 */
type TransformFunction<T, R> = (value: T) => R;

/**
 * Transformation function with options for non-validated values
 * @internal
 */
type TransformWithOptionsFunction<T, R> = (value: T, options: Record<string, unknown>) => R;