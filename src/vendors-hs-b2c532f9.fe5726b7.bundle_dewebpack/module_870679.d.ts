/**
 * Moment.js locale configuration for Klingon (tlh)
 * Provides translations and formatting rules for displaying dates and times in the Klingon language
 */

import type { Locale, LocaleSpecification } from 'moment';

/**
 * Number words in Klingon from 0-9
 */
type KlingonNumberWord = 'pagh' | "wa'" | "cha'" | 'wej' | 'loS' | 'vagh' | 'jav' | 'Soch' | 'chorgh' | 'Hut';

/**
 * Time unit identifiers supported by the relative time formatter
 */
type TimeUnit = 'ss' | 'mm' | 'hh' | 'dd' | 'MM' | 'yy';

/**
 * Configuration options for long date formats
 */
interface LongDateFormat {
  /** Time format (hours:minutes) */
  LT: string;
  /** Time format with seconds */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date with time */
  LLL: string;
  /** Full date with day name and time */
  LLLL: string;
}

/**
 * Calendar format strings for relative day references
 */
interface CalendarSpec {
  /** Format for today */
  sameDay: string;
  /** Format for tomorrow */
  nextDay: string;
  /** Format for next week */
  nextWeek: string;
  /** Format for yesterday */
  lastDay: string;
  /** Format for last week */
  lastWeek: string;
  /** Format for other dates */
  sameElse: string;
}

/**
 * Relative time configuration with formatters for past/future
 */
interface RelativeTimeSpec {
  /** Function to format future dates */
  future: (relativeTime: string) => string;
  /** Function to format past dates */
  past: (relativeTime: string) => string;
  /** Format for seconds (a few) */
  s: string;
  /** Format for multiple seconds */
  ss: RelativeTimeFormatter;
  /** Format for one minute */
  m: string;
  /** Format for multiple minutes */
  mm: RelativeTimeFormatter;
  /** Format for one hour */
  h: string;
  /** Format for multiple hours */
  hh: RelativeTimeFormatter;
  /** Format for one day */
  d: string;
  /** Format for multiple days */
  dd: RelativeTimeFormatter;
  /** Format for one month */
  M: string;
  /** Format for multiple months */
  MM: RelativeTimeFormatter;
  /** Format for one year */
  y: string;
  /** Format for multiple years */
  yy: RelativeTimeFormatter;
}

/**
 * Function signature for formatting relative time units
 * @param value - The numeric value to format
 * @param withoutSuffix - Whether to exclude suffix/prefix
 * @param unit - The time unit identifier
 * @param isFuture - Whether the time is in the future
 * @returns Formatted time string in Klingon
 */
type RelativeTimeFormatter = (
  value: number,
  withoutSuffix: boolean,
  unit: string,
  isFuture: boolean
) => string;

/**
 * Week configuration options
 */
interface WeekSpec {
  /** Day of week (0=Sunday, 1=Monday) */
  dow: number;
  /** Day of year that defines week 1 */
  doy: number;
}

/**
 * Complete locale specification for Klingon
 */
interface KlingonLocaleSpec extends LocaleSpecification {
  months: string[];
  monthsShort: string[];
  monthsParseExact: boolean;
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
  longDateFormat: LongDateFormat;
  calendar: CalendarSpec;
  relativeTime: RelativeTimeSpec;
  dayOfMonthOrdinalParse: RegExp;
  ordinal: string;
  week: WeekSpec;
}

/**
 * Converts a number (0-999) to Klingon number words
 * Handles hundreds (vatlh), tens (maH), and ones places
 * @param num - The number to convert (0-999)
 * @returns Klingon representation of the number
 */
declare function convertNumberToKlingon(num: number): string;

/**
 * Formats a time duration in Klingon based on the unit
 * @param value - The numeric value
 * @param withoutSuffix - Whether to exclude suffix/prefix
 * @param unit - The time unit (ss, mm, hh, dd, MM, yy)
 * @param isFuture - Whether the time is in the future
 * @returns Formatted duration string with appropriate Klingon unit suffix
 */
declare function formatRelativeTime(
  value: number,
  withoutSuffix: boolean,
  unit: TimeUnit,
  isFuture: boolean
): string;

/**
 * Transforms a relative time string to future tense in Klingon
 * Applies appropriate suffixes based on time unit:
 * - jaj (day) → leS
 * - jar (month) → waQ
 * - DIS (year) → nem
 * - other → pIq
 * @param relativeTime - The relative time string to transform
 * @returns Future tense formatted string
 */
declare function formatFutureTime(relativeTime: string): string;

/**
 * Transforms a relative time string to past tense in Klingon
 * Applies appropriate suffixes based on time unit:
 * - jaj (day) → Hu'
 * - jar (month) → wen
 * - DIS (year) → ben
 * - other → ret
 * @param relativeTime - The relative time string to transform
 * @returns Past tense formatted string
 */
declare function formatPastTime(relativeTime: string): string;

/**
 * Defines and registers the Klingon locale configuration with moment.js
 * @param momentInstance - The moment.js instance to configure
 * @returns The configured locale object
 */
declare function defineKlingonLocale(momentInstance: typeof import('moment')): Locale;

/**
 * The complete Klingon locale configuration object
 */
export declare const klingonLocale: KlingonLocaleSpec;

export default defineKlingonLocale;