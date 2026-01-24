/**
 * Normalizes object keys by ensuring a specific key exists with the correct casing.
 * If a case-insensitive match is found, it replaces the mismatched key with the normalized one.
 * 
 * @param target - The object whose keys should be normalized
 * @param normalizedKey - The desired key name with correct casing
 * 
 * @example
 * const headers = { 'content-type': 'application/json', 'Content-Type': 'text/html' };
 * normalizeObjectKey(headers, 'Content-Type');
 * // Result: { 'Content-Type': 'text/html' }
 */
export declare function normalizeObjectKey<T extends Record<string, unknown>>(
  target: T,
  normalizedKey: string
): void;