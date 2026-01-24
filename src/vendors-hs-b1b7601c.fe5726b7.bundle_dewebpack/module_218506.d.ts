/**
 * Utility module for converting object entries into pairs
 */

/**
 * Converts an object into an iterable collection of key-value pairs.
 * 
 * @template T - The type of the input object
 * @template R - The type of the resulting collection elements
 * @param obj - The source object to convert into pairs
 * @param transform - Optional transformation function to apply to each entry
 * @returns An iterable collection of key-value pairs, optionally transformed
 * 
 * @example
 *