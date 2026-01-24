/**
 * Converts a JavaScript object containing circular references into a JSON-safe object
 * by replacing circular references with path strings.
 * 
 * @param obj - The object to decycle (may contain circular references)
 * @param replacer - Optional function to transform values before processing
 * @returns A JSON-safe object where circular references are replaced with { $ref: "path" }
 * 
 * @example
 * const circular = { a: 1 };
 * circular.self = circular;
 * const safe = JSONDecycle(circular);
 * // Result: { a: 1, self: { $ref: "$" } }
 */
export function JSONDecycle<T = unknown>(
  obj: T,
  replacer?: (value: unknown) => unknown
): unknown;

/**
 * Restores an object that was previously decycled by JSONDecycle,
 * reconstructing circular references from path strings.
 * 
 * @param obj - The decycled object containing $ref properties
 * @returns The original object with circular references restored
 * 
 * @example
 * const decycled = { a: 1, self: { $ref: "$" } };
 * const restored = JSONRetrocycle(decycled);
 * // Result: { a: 1, self: [Circular] }
 * 
 * @warning Uses eval() internally - only use with trusted data sources
 */
export function JSONRetrocycle<T = unknown>(obj: T): T;

/**
 * Reference object used to mark circular references in decycled objects
 */
interface CircularReference {
  /**
   * JSON path string pointing to the original object location
   * Format: "$[key1][key2]..." where $ represents the root
   */
  $ref: string;
}