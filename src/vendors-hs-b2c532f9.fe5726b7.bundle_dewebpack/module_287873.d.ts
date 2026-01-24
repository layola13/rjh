/**
 * Czech (cs) locale configuration for Moment.js
 * Defines month names, weekday names, date formats, and relative time translations
 * with proper Czech grammar rules for pluralization
 */

/**
 * Moment.js locale instance
 */
import type { Locale } from 'moment';

/**
 * Month names configuration with standalone and format variants
 */
interface MonthsConfig {
  /** Month names in nominative case (standalone) */
  standalone: string[];
  /** Month names in genitive case (used with dates) */
  format: string[];
  /** Regex pattern to detect format context */
  isFormat: RegExp;
}

/**
 * Calendar specification for relative date descriptions
 */
interface CalendarSpec {
  /** Format for dates on the same day */
  sameDay: string;
  /** Format for dates on the next day */
  nextDay: string;
  /** Function returning format for dates in the next week */
  nextWeek(this: moment.Moment): string;
  /** Format for dates on the previous day */
  lastDay: string;
  /** Function returning format for dates in the last week */
  lastWeek(this: moment.Moment): string;
  /** Format for all other dates */
  sameElse: string;
}

/**
 * Relative time configuration
 */
interface RelativeTimeSpec {
  /** Template for future dates */
  future: string;
  /** Template for past dates */
  past: string;
  /** Seconds translation function */
  s: RelativeTimeFunction;
  /** Multiple seconds translation function */
  ss: RelativeTimeFunction;
  /** Minute translation function */
  m: RelativeTimeFunction;
  /** Multiple minutes translation function */
  mm: RelativeTimeFunction;
  /** Hour translation function */
  h: RelativeTimeFunction;
  /** Multiple hours translation function */
  hh: RelativeTimeFunction;
  /** Day translation function */
  d: RelativeTimeFunction;
  /** Multiple days translation function */
  dd: RelativeTimeFunction;
  /** Month translation function */
  M: RelativeTimeFunction;
  /** Multiple months translation function */
  MM: RelativeTimeFunction;
  /** Year translation function */
  y: RelativeTimeFunction;
  /** Multiple years translation function */
  yy: RelativeTimeFunction;
}

/**
 * Function signature for relative time translation
 * @param count - The numeric value
 * @param withoutSuffix - Whether to include suffix
 * @param key - The time unit key (s, m, h, d, M, y, etc.)
 * @param isFuture - Whether the time is in the future
 * @returns Translated string
 */
type RelativeTimeFunction = (
  count: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
) => string;

/**
 * Checks if a number should use plural form in Czech
 * Czech uses special plural rules: 2-4 use one form, except for numbers ending in 10-14
 * @param count - The number to check
 * @returns True if the number requires plural form (2-4, excluding x10-x14)
 */
declare function isPluralForm(count: number): boolean;

/**
 * Translates relative time expressions with proper Czech grammar
 * Handles pluralization and case declension based on context
 * @param count - The numeric value
 * @param withoutSuffix - Whether to omit suffix/preposition
 * @param timeUnit - The time unit identifier (s, ss, m, mm, h, hh, d, dd, M, MM, y, yy)
 * @param isFuture - Whether the time reference is in the future
 * @returns Localized relative time string
 */
declare function translateRelativeTime(
  count: number,
  withoutSuffix: boolean,
  timeUnit: string,
  isFuture: boolean
): string;

/**
 * Czech locale configuration object
 */
declare const czechLocale: Locale;

export default czechLocale;

/**
 * Month names in nominative case (standalone usage)
 * Example: "Dnes je leden" (Today is January)
 */
export declare const STANDALONE_MONTHS: readonly [
  'leden', 'únor', 'březen', 'duben', 'květen', 'červen',
  'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec'
];

/**
 * Month names in genitive case (used with day numbers)
 * Example: "15. ledna" (January 15th)
 */
export declare const FORMAT_MONTHS: readonly [
  'ledna', 'února', 'března', 'dubna', 'května', 'června',
  'července', 'srpna', 'září', 'října', 'listopadu', 'prosince'
];

/**
 * Abbreviated month names
 */
export declare const SHORT_MONTHS: readonly [
  'led', 'úno', 'bře', 'dub', 'kvě', 'čvn',
  'čvc', 'srp', 'zář', 'říj', 'lis', 'pro'
];

/**
 * Weekday names (full)
 */
export declare const WEEKDAYS: readonly [
  'neděle', 'pondělí', 'úterý', 'středa',
  'čtvrtek', 'pátek', 'sobota'
];

/**
 * Abbreviated weekday names
 */
export declare const WEEKDAYS_SHORT: readonly [
  'ne', 'po', 'út', 'st', 'čt', 'pá', 'so'
];

/**
 * Regex patterns for parsing month names
 */
export declare const MONTH_PARSE_REGEXES: readonly RegExp[];

/**
 * Combined regex for matching any month name or abbreviation
 */
export declare const MONTHS_REGEX: RegExp;