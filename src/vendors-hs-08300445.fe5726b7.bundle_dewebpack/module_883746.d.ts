/**
 * Utility function that creates a shallow copy of an object and removes specified keys
 * @param source - The source object to copy
 * @param keysToRemove - Array of property keys to exclude from the result
 * @returns A new object with specified keys removed
 */
export default function omitKeys<T extends Record<string, any>, K extends keyof T>(
  source: T,
  keysToRemove: K[]
): Omit<T, K>;