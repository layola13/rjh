/**
 * Module: module_dd
 * Original ID: dd
 * 
 * Hebrew day formatting utility
 */

/**
 * Formats a number of days in Hebrew.
 * 
 * @param days - The number of days to format
 * @returns A Hebrew string representation of the day count
 * 
 * @remarks
 * - Returns "יומיים" (two days) when days equals 2
 * - Returns "{days} ימים" (X days) for all other values
 * 
 * @example
 *