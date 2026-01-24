/**
 * Conditionally processes a value and optionally concatenates additional elements.
 * If the input is an array, returns the base result directly.
 * Otherwise, concatenates the base result with additional elements.
 * 
 * @template T - The type of the input value
 * @param value - The value to process
 * @param baseTransform - Function to transform the input value into an array
 * @param additionalTransform - Function to get additional elements to append
 * @returns The processed array, optionally concatenated with additional elements
 */
declare function conditionalConcat<T, R>(
  value: T,
  baseTransform: (value: T) => R[],
  additionalTransform: (value: T) => R[]
): R[];

export = conditionalConcat;

/**
 * Module dependencies (inferred):
 * - 176585: concat utility (concatenates arrays)
 * - 962726: isArray check (determines if value is an array)
 */