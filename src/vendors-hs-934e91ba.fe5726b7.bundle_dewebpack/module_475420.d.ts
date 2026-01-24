/**
 * Pads a string on the left side if it's shorter than the specified length.
 * 
 * @param value - The string to pad
 * @param length - The target length for the padded string
 * @param chars - The characters to use for padding (defaults to space)
 * @returns The padded string, or the original string if it's already at or exceeds the target length
 * 
 * @example
 * padStart('abc', 6, '_') // returns '___abc'
 * padStart('abc', 3, '_') // returns 'abc'
 * padStart('abc', 2, '_') // returns 'abc'
 */
export function padStart(
  value: string,
  length: number,
  chars?: string
): string;

export default padStart;