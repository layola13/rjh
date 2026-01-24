/**
 * Literal module - Converts literal values to quoted string representation
 * @module module_literal
 */

/**
 * Input parameter for literal formatting
 */
interface LiteralInput {
  /** The raw text content to be quoted */
  text: string;
}

/**
 * Escapes special characters in a string for safe output
 * @param value - The string value to escape
 * @returns Escaped string
 */
declare function escapeString(value: string): string;

/**
 * Converts a literal object to a quoted string representation
 * @param input - The literal input containing text to be formatted
 * @returns A double-quoted string with escaped content
 * @example
 *