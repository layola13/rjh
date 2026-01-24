/**
 * Omits specified properties from an object and includes enumerable Symbol properties
 * that are not in the exclusion list.
 * 
 * @template T - The source object type
 * @template K - The keys to omit from the object
 * @param source - The source object to copy properties from
 * @param keysToExclude - Array of property keys (string or Symbol) to exclude
 * @returns A new object with properties copied from source, excluding specified keys,
 *          and including enumerable Symbol properties not in the exclusion list
 */
export default function omitWithSymbols<T extends object, K extends keyof T>(
  source: T | null | undefined,
  keysToExclude: readonly (string | symbol)[]
): Omit<T, K> & Record<symbol, unknown>;