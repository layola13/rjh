/**
 * Moment.js Locale Configuration for Tamazight (tzm)
 * 
 * This module defines the Tamazight locale for moment.js, including:
 * - Month names and abbreviations in Tifinagh script
 * - Weekday names in Tifinagh script
 * - Date/time formatting patterns
 * - Calendar expressions for relative dates
 * - Relative time formatting rules
 * - Week configuration (first day of week, first week of year)
 * 
 * @module moment/locale/tzm
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Configuration for long date format patterns
 */
interface LongDateFormatConfig {
  /** Time format (24-hour) */
  LT: string;
  /** Time format with seconds */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date format with time */
  LLL: string;
  /** Full date format with weekday and time */
  LLLL: string;
}

/**
 * Calendar format strings for different relative day contexts
 */
interface CalendarConfig {
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
  /** Fallback format */
  sameElse: string;
}

/**
 * Relative time format strings
 */
interface RelativeTimeConfig {
  /** Future time prefix/format */
  future: string;
  /** Past time prefix/format */
  past: string;
  /** Seconds (singular) */
  s: string;
  /** Seconds (plural) */
  ss: string;
  /** Minute (singular) */
  m: string;
  /** Minutes (plural) */
  mm: string;
  /** Hour (singular) */
  h: string;
  /** Hours (plural) */
  hh: string;
  /** Day (singular) */
  d: string;
  /** Days (plural) */
  dd: string;
  /** Month (singular) */
  M: string;
  /** Months (plural) */
  MM: string;
  /** Year (singular) */
  y: string;
  /** Years (plural) */
  yy: string;
}

/**
 * Week configuration settings
 */
interface WeekConfig {
  /** Day of week (0=Sunday, 6=Saturday) */
  dow: number;
  /** Day of year that defines week 1 */
  doy: number;
}

/**
 * Complete Tamazight locale specification
 */
interface TamazightLocaleSpec extends LocaleSpecification {
  /** Month names in Tifinagh script */
  months: string[];
  /** Abbreviated month names in Tifinagh script */
  monthsShort: string[];
  /** Weekday names in Tifinagh script */
  weekdays: string[];
  /** Abbreviated weekday names in Tifinagh script */
  weekdaysShort: string[];
  /** Minimum weekday names in Tifinagh script */
  weekdaysMin: string[];
  /** Long date format patterns */
  longDateFormat: LongDateFormatConfig;
  /** Calendar format patterns */
  calendar: CalendarConfig;
  /** Relative time format patterns */
  relativeTime: RelativeTimeConfig;
  /** Week calculation settings */
  week: WeekConfig;
}

/**
 * Defines and returns the Tamazight (tzm) locale configuration for moment.js
 * 
 * @param momentInstance - The moment.js instance to register the locale with
 * @returns The registered locale object
 */
export function defineTamazightLocale(momentInstance: typeof import('moment')): Locale;

/**
 * The Tamazight locale specification object
 */
export const tamazightLocale: TamazightLocaleSpec;

/**
 * Locale identifier
 */
export const localeId: 'tzm';

export default defineTamazightLocale;