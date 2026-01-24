/**
 * Moment.js locale configuration for Arabic (Libya) - ar-ly
 * Provides localization support including month names, weekday names,
 * date formats, and relative time formatting with Arabic plural rules.
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Maps Western Arabic numerals to their Arabic-Indic equivalents
 */
declare const arabicNumberMap: Record<string, string>;

/**
 * Determines the plural form index for Arabic numbers based on Arabic plural rules
 * @param count - The number to determine plural form for
 * @returns Index (0-5) indicating which plural form to use:
 *   0: zero/less than one
 *   1: exactly one
 *   2: exactly two
 *   3: 3-10 (few)
 *   4: 11-99 (many)
 *   5: 100+ (other)
 */
declare function getPluralFormIndex(count: number): number;

/**
 * Time unit plural forms for Arabic locale
 * Each unit contains 6 forms following Arabic plural rules
 */
interface RelativeTimeTemplates {
  /** Second forms: less than, one, two, few, many, other */
  s: [string, string, [string, string], string, string, string];
  /** Minute forms */
  m: [string, string, [string, string], string, string, string];
  /** Hour forms */
  h: [string, string, [string, string], string, string, string];
  /** Day forms */
  d: [string, string, [string, string], string, string, string];
  /** Month forms */
  M: [string, string, [string, string], string, string, string];
  /** Year forms */
  y: [string, string, [string, string], string, string, string];
}

/**
 * Creates a relative time formatter function for a specific time unit
 * @param unit - The time unit key (s, m, h, d, M, y)
 * @returns Function that formats relative time strings with proper Arabic pluralization
 */
declare function createRelativeTimeFormatter(
  unit: keyof RelativeTimeTemplates
): (
  value: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
) => string;

/**
 * Arabic month names (both full and short forms use the same)
 */
declare const arabicMonths: readonly [
  'يناير',
  'فبراير',
  'مارس',
  'أبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر'
];

/**
 * Locale configuration object for Arabic (Libya)
 */
declare const arLyLocaleConfig: LocaleSpecification;

/**
 * Defines and registers the ar-ly locale with Moment.js
 * @param moment - Moment.js instance
 * @returns The registered locale
 */
export default function defineArLyLocale(moment: typeof import('moment')): Locale;

/**
 * Parses Arabic comma separators to standard comma-space format
 * @param text - Input string with Arabic punctuation
 * @returns String with standardized punctuation
 */
declare function preparse(text: string): string;

/**
 * Converts Western numerals to Arabic-Indic numerals and formats punctuation
 * @param text - Input string with Western numerals
 * @returns String with Arabic-Indic numerals and Arabic punctuation
 */
declare function postformat(text: string): string;

/**
 * Determines if the time is PM (afternoon/evening)
 * @param meridiem - Arabic meridiem indicator ('ص' or 'م')
 * @returns True if PM, false if AM
 */
declare function isPM(meridiem: string): boolean;

/**
 * Returns the appropriate meridiem indicator for a given time
 * @param hour - Hour of the day (0-23)
 * @param minute - Minute of the hour
 * @param isLowercase - Whether to return lowercase (unused in Arabic)
 * @returns 'ص' for AM (before noon) or 'م' for PM (after noon)
 */
declare function meridiem(
  hour: number,
  minute: number,
  isLowercase: boolean
): string;