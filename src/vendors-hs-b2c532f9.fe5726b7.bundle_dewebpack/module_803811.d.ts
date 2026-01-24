/**
 * Moment.js Ukrainian (uk) locale configuration
 * Provides localization for dates, times, and relative time formatting in Ukrainian
 */

import { Locale, MomentInput } from 'moment';

/**
 * Type definition for plural form keys used in Ukrainian time unit formatting
 */
type PluralFormKey = 'ss' | 'mm' | 'hh' | 'dd' | 'MM' | 'yy';

/**
 * Type definition for weekday case variants in Ukrainian grammar
 */
type WeekdayCase = 'nominative' | 'accusative' | 'genitive';

/**
 * Configuration object for Ukrainian weekday names in different grammatical cases
 */
interface WeekdayNamesConfig {
  /** Nominative case: used for standalone weekday names */
  nominative: string[];
  /** Accusative case: used with prepositions like "в" (on) */
  accusative: string[];
  /** Genitive case: used with words like "минулої/наступної" (last/next) */
  genitive: string[];
}

/**
 * Determines the correct plural form for Ukrainian time units based on the number
 * @param count - The numeric value to determine plural form for
 * @param withoutSuffix - Whether the output is used without a suffix (affects declension)
 * @param key - The time unit key (ss, mm, hh, dd, MM, yy, m, h)
 * @returns Formatted string with appropriate plural form
 */
declare function relativeTimeWithPlural(
  count: number,
  withoutSuffix: boolean,
  key: PluralFormKey | 'm' | 'h'
): string;

/**
 * Creates a calendar time format function with appropriate preposition
 * @param preposition - The Ukrainian preposition/phrase to prepend (e.g., "Сьогодні", "Завтра")
 * @returns Function that formats the time with proper grammar
 */
declare function buildCalendarTimeFunction(
  preposition: string
): () => string;

/**
 * Ukrainian locale configuration for moment.js
 * Includes months, weekdays, date formats, calendar expressions, and relative time
 */
declare const ukrainianLocale: Locale;

/**
 * Month names in genitive case (used with day numbers)
 * Example: "15 січня" (15th of January)
 */
declare const monthsFormat: string[];

/**
 * Month names in nominative case (standalone usage)
 * Example: "Січень" (January)
 */
declare const monthsStandalone: string[];

/**
 * Abbreviated month names (3-4 characters)
 */
declare const monthsShort: string[];

/**
 * Retrieves the appropriate weekday name based on grammatical context
 * @param momentInstance - The moment instance or boolean flag
 * @param format - The format string being used (determines grammatical case)
 * @returns Appropriate weekday name or array of names
 */
declare function getWeekdayName(
  momentInstance: MomentInput | boolean,
  format: string
): string | string[];

/**
 * Abbreviated weekday names (2 characters)
 * нд (Sunday), пн (Monday), вт (Tuesday), ср (Wednesday), чт (Thursday), пт (Friday), сб (Saturday)
 */
declare const weekdaysShort: string[];

/**
 * Minimal weekday names (2 characters, same as short form in Ukrainian)
 */
declare const weekdaysMin: string[];

/**
 * Determines appropriate time of day word (night/morning/day/evening)
 * @param hour - Hour of the day (0-23)
 * @param minute - Minute of the hour
 * @param isLowercase - Whether to return lowercase version
 * @returns Ukrainian word for time of day period
 */
declare function getMeridiem(
  hour: number,
  minute: number,
  isLowercase: boolean
): string;

/**
 * Checks if the given time period represents PM (afternoon/evening)
 * @param meridiemString - The meridiem string to check
 * @returns True if the period is PM (afternoon or evening)
 */
declare function isPM(meridiemString: string): boolean;

/**
 * Returns appropriate ordinal suffix for dates
 * @param number - The number to add ordinal to
 * @param period - The period type (M, d, DDD, w, W, D, etc.)
 * @returns Number with appropriate Ukrainian ordinal suffix
 */
declare function getOrdinal(number: number, period: string): string;

/**
 * Calendar format configuration returning the appropriate format function
 * for last week based on the day of the week
 * @returns Format string for the calendar display
 */
declare function getLastWeekFormat(this: MomentInput): string;

export {
  ukrainianLocale as default,
  relativeTimeWithPlural,
  buildCalendarTimeFunction,
  getWeekdayName,
  getMeridiem,
  isPM,
  getOrdinal,
  getLastWeekFormat,
  WeekdayCase,
  PluralFormKey,
  WeekdayNamesConfig
};