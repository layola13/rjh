/**
 * Date picker month change utility
 * Handles month transitions including year boundaries
 */

/**
 * Adjusts a date string by adding or subtracting months
 * @param dateString - Date string in format "YYYY-MM"
 * @param monthDelta - Number of months to add (positive) or subtract (negative)
 * @returns New date string in format "YYYY-MM" after applying the month change
 * @example
 * monthChange("2023-12", 1) // Returns "2024-01"
 * monthChange("2023-01", -1) // Returns "2022-12"
 * monthChange("2023-06", 3) // Returns "2023-09"
 */
export default function monthChange(dateString: string, monthDelta: number): string;

/**
 * Pads a number with leading zeros to ensure two digits
 * @param value - Number to pad
 * @returns String representation with leading zero if needed
 * @example
 * pad(5) // Returns "05"
 * pad(12) // Returns "12"
 */
export function pad(value: number): string;