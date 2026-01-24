/**
 * Converts a value to string with optional fallback.
 * Returns empty string if no arguments provided, or the fallback value if provided.
 * Otherwise converts the input value to a string.
 * 
 * @param value - The value to convert to string
 * @param fallback - Optional fallback value to return when value is undefined
 * @returns The stringified value, fallback, or empty string
 */
declare function toString(value: undefined, fallback?: string): string;
declare function toString<T>(value: T, fallback?: string): string;

export = toString;