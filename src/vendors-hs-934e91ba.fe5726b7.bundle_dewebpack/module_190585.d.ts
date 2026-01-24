/**
 * Composes a higher-order function by applying three utility functions in sequence.
 * This module exports a function that takes an input and processes it through
 * a pipeline of transformations.
 */

/**
 * Main exported function that processes input through a transformation pipeline.
 * 
 * @template T - The input type
 * @template U - The intermediate type returned by the third parameter
 * @template R - The final return type
 * 
 * @param input - The value to be processed
 * @returns The result after applying the transformation pipeline
 * 
 * @remarks
 * This function internally uses three imported utilities:
 * - A base transformation function (from module 179012)
 * - A normalization function (from module 189611)
 * - An iteration/mapping function (from module 435627)
 * 
 * The typical flow is: input → iteration → normalization → base transformation → result
 */
export default function processWithPipeline<T, U, R>(input: T): R;

/**
 * Type alias for the main export
 */
declare const _default: <T, U = unknown, R = unknown>(input: T) => R;
export = _default;

/**
 * Alternative named export signature
 */
export function module190585<T, R>(input: T): R;

/**
 * Generic transformation pipeline type
 */
export type TransformationPipeline<T, R> = (input: T) => R;

/**
 * Configuration options if the function accepts a second parameter
 */
export interface PipelineOptions {
  /** Enable strict mode processing */
  strict?: boolean;
  /** Custom transformation behavior */
  custom?: boolean;
}