/**
 * Moment.js locale configuration for Macedonian (mk)
 * 
 * This module provides localization support for the Macedonian language,
 * including month names, weekday names, date formats, and relative time formatting.
 */

import { Moment, LocaleSpecification } from 'moment';

/**
 * Configuration object for Macedonian locale
 */
declare const macedonianLocaleConfig: LocaleSpecification;

export default macedonianLocaleConfig;

/**
 * Macedonian month names (full)
 * @example "јануари", "февруари", "март"
 */
export declare const months: string[];

/**
 * Macedonian month names (abbreviated)
 * @example "јан", "фев", "мар"
 */
export declare const monthsShort: string[];

/**
 * Macedonian weekday names (full)
 * @example "недела", "понеделник", "вторник"
 */
export declare const weekdays: string[];

/**
 * Macedonian weekday names (short)
 * @example "нед", "пон", "вто"
 */
export declare const weekdaysShort: string[];

/**
 * Macedonian weekday names (minimal)
 * @example "нe", "пo", "вт"
 */
export declare const weekdaysMin: string[];

/**
 * Long date format tokens for Macedonian locale
 */
export interface LongDateFormat {
  /** Time format (e.g., "14:30") */
  LT: string;
  /** Time with seconds format (e.g., "14:30:45") */
  LTS: string;
  /** Short date format (e.g., "15.03.2024") */
  L: string;
  /** Long date format (e.g., "15 март 2024") */
  LL: string;
  /** Long date with time (e.g., "15 март 2024 14:30") */
  LLL: string;
  /** Full date with weekday and time (e.g., "петок, 15 март 2024 14:30") */
  LLLL: string;
}

/**
 * Calendar format configuration for relative dates
 */
export interface CalendarFormat {
  /** Format for today (e.g., "Денес во 14:30") */
  sameDay: string;
  /** Format for tomorrow (e.g., "Утре во 14:30") */
  nextDay: string;
  /** Format for next week (e.g., "Во понеделник во 14:30") */
  nextWeek: string;
  /** Format for yesterday (e.g., "Вчера во 14:30") */
  lastDay: string;
  /** 
   * Format for last week - returns different text based on day of week
   * Days 0,3,6 use "Изминатата" (feminine)
   * Days 1,2,4,5 use "Изминатиот" (masculine)
   */
  lastWeek: (this: Moment) => string;
  /** Default format for other dates */
  sameElse: string;
}

/**
 * Relative time format configuration
 */
export interface RelativeTimeFormat {
  /** Future time prefix (e.g., "за 5 минути") */
  future: string;
  /** Past time prefix (e.g., "пред 5 минути") */
  past: string;
  /** Few seconds */
  s: string;
  /** Seconds (plural) */
  ss: string;
  /** One minute */
  m: string;
  /** Minutes (plural) */
  mm: string;
  /** One hour */
  h: string;
  /** Hours (plural) */
  hh: string;
  /** One day */
  d: string;
  /** Days (plural) */
  dd: string;
  /** One month */
  M: string;
  /** Months (plural) */
  MM: string;
  /** One year */
  y: string;
  /** Years (plural) */
  yy: string;
}

/**
 * Week configuration for Macedonian locale
 */
export interface WeekConfig {
  /** Day of week (1 = Monday) */
  dow: number;
  /** Day of year that defines first week */
  doy: number;
}

/**
 * Determines the ordinal suffix for a given day of month
 * 
 * @param dayOfMonth - The day of the month (1-31)
 * @returns The day number with appropriate Macedonian ordinal suffix
 * 
 * @example
 * ordinal(1)   // "1-ви"
 * ordinal(2)   // "2-ри"
 * ordinal(7)   // "7-ми"
 * ordinal(10)  // "10-ен"
 * ordinal(20)  // "20-ен"
 */
export declare function ordinal(dayOfMonth: number): string;

/**
 * Regular expression pattern for parsing ordinal day of month
 * Matches patterns like: 1-ев, 2-ен, 3-ти, 4-ви, 5-ри, 6-ми
 */
export declare const dayOfMonthOrdinalParse: RegExp;