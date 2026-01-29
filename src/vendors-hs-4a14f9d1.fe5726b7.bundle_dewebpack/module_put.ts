/**
 * Delegates to the put method of the underlying API
 * @param target - The target parameter
 * @param entry - The entry parameter
 * @param config - The configuration parameter
 * @returns The result of the put operation
 */
export function put<T = unknown, E = unknown, C = unknown, R = unknown>(
  target: T,
  entry: E,
  config: C
): R {
  return A.put(target, entry, config);
}