/**
 * Object spread helper - similar to Object.assign but includes symbol properties
 * Merges enumerable own properties and symbols from source objects into target object
 * 
 * @template T - Target object type
 * @template U - Source objects types
 * @param target - The target object to merge properties into
 * @param sources - One or more source objects to merge from
 * @returns The target object with merged properties
 * 
 * @example
 * const result = objectSpread({ a: 1 }, { b: 2 }, { c: 3 });
 * // result: { a: 1, b: 2, c: 3 }
 */
export default function objectSpread<T extends object, U extends object[]>(
  target: T,
  ...sources: U
): T & UnionToIntersection<U[number]>;

/**
 * Helper type to convert union to intersection
 * @internal
 */
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

/**
 * Gets all enumerable property keys (strings and symbols) from an object
 * 
 * @param obj - The object to get keys from
 * @param includeSymbols - Whether to include symbol properties
 * @returns Array of property keys (strings and symbols)
 * @internal
 */
declare function getOwnPropertyKeysAndSymbols(
  obj: object,
  includeSymbols: boolean
): Array<string | symbol>;

/**
 * Helper function from external module (ID: 797560)
 * Likely defineProperty helper
 * @internal
 */
declare function definePropertyHelper(
  target: object,
  key: string | symbol,
  value: any
): void;