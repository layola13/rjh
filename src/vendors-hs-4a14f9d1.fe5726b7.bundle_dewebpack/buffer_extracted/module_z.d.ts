/**
 * Formats a timezone offset into a string representation (e.g., "+0800", "-0500").
 * 
 * @param date - A date object containing timezone offset information
 * @returns A formatted timezone offset string in the format ±HHMM
 * 
 * @example
 * formatTimezoneOffset({ tm_gmtoff: 28800 }) // Returns "+0800"
 * formatTimezoneOffset({ tm_gmtoff: -18000 }) // Returns "-0500"
 */
export declare function formatTimezoneOffset(date: TimezoneInfo): string;

/**
 * Represents timezone information with GMT offset in seconds.
 */
export interface TimezoneInfo {
  /**
   * The offset from GMT in seconds.
   * Positive values indicate east of GMT, negative values indicate west of GMT.
   */
  tm_gmtoff: number;
}