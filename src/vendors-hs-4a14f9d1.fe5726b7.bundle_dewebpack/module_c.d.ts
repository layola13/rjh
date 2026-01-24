/**
 * Date century formatter module
 * Formats a date's century component (year divided by 100)
 * @module module__C
 */

/**
 * Represents a time structure with year component
 */
interface TimeStructure {
  /** Year offset from 1900 (e.g., 123 for year 2023) */
  tm_year: number;
}

/**
 * Formats the century from a time structure
 * @param timeStruct - Time structure containing tm_year (years since 1900)
 * @returns Formatted century string with 2-digit padding
 * @example
 * // For year 2023 (tm_year = 123)
 * // Returns: "20"
 */
export declare function formatCentury(timeStruct: TimeStructure): string;

/**
 * Generic formatter function type
 * @param value - Value to format
 * @param width - Minimum width for padding
 * @returns Formatted string
 */
type FormatterFunction = (value: number, width: number) => string;