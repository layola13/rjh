/**
 * Pads a string to a specified length by repeating a padding string.
 * Handles Unicode characters correctly by checking if the target string contains surrogate pairs.
 * 
 * @param length - The target length of the padded string
 * @param chars - The string to use for padding (defaults to a space " ")
 * @returns The padded string, truncated to the exact target length if necessary
 * 
 * @example
 * padString(10, '-') // Returns '----------'
 * padString(5, 'ab') // Returns 'ababa'
 * padString(3, '🔥') // Returns '🔥🔥🔥' (handles Unicode correctly)
 */
declare function padString(length: number, chars?: string): string;

export default padString;