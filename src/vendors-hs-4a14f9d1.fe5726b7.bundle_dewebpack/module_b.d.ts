/**
 * Month abbreviation formatter
 * Converts a Date-like object to a 3-letter month abbreviation (e.g., "Jan", "Feb")
 */

/** Month names array (full or abbreviated) */
declare const s: readonly string[];

/**
 * Date-like object with month information
 */
interface DateLike {
  /** Month index (0-11, where 0 = January) */
  tm_mon: number;
}

/**
 * Extracts the first 3 characters of the month name
 * @param date - Date-like object containing month index
 * @returns Three-letter month abbreviation
 * @example
 *