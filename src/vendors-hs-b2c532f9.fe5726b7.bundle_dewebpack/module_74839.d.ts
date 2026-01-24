/**
 * Moment.js locale configuration for Sinhala (si)
 * Provides localized date/time formatting for Sri Lankan Sinhala language
 */

import { Locale, MomentInput } from 'moment';

/**
 * Configuration object for Sinhala locale
 */
export interface SinhalaLocaleConfig {
  /** Full month names in Sinhala */
  months: string[];
  
  /** Abbreviated month names in Sinhala */
  monthsShort: string[];
  
  /** Full weekday names in Sinhala */
  weekdays: string[];
  
  /** Abbreviated weekday names in Sinhala */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Sinhala */
  weekdaysMin: string[];
  
  /** Whether to use exact parsing for weekdays */
  weekdaysParseExact: boolean;
  
  /** Long date format tokens */
  longDateFormat: LongDateFormatConfig;
  
  /** Calendar relative time configuration */
  calendar: CalendarConfig;
  
  /** Relative time formatting configuration */
  relativeTime: RelativeTimeConfig;
  
  /** Regular expression for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /** Function to format ordinal numbers */
  ordinal: (num: number) => string;
  
  /** Regular expression for parsing meridiem (AM/PM) */
  meridiemParse: RegExp;
  
  /** Function to determine if time is PM */
  isPM: (input: string) => boolean;
  
  /** Function to format meridiem based on hour, minute, and lowercase flag */
  meridiem: (hour: number, minute: number, isLowercase: boolean) => string;
}

/**
 * Long date format configuration
 */
export interface LongDateFormatConfig {
  /** Time format */
  LT: string;
  
  /** Time with seconds format */
  LTS: string;
  
  /** Short date format */
  L: string;
  
  /** Long date format */
  LL: string;
  
  /** Long date with time format */
  LLL: string;
  
  /** Full date with time format */
  LLLL: string;
}

/**
 * Calendar relative date configuration
 */
export interface CalendarConfig {
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
 * Relative time formatting configuration
 */
export interface RelativeTimeConfig {
  /** Format for future dates */
  future: string;
  
  /** Format for past dates */
  past: string;
  
  /** Format for seconds */
  s: string;
  
  /** Format for multiple seconds */
  ss: string;
  
  /** Format for a minute */
  m: string;
  
  /** Format for multiple minutes */
  mm: string;
  
  /** Format for an hour */
  h: string;
  
  /** Format for multiple hours */
  hh: string;
  
  /** Format for a day */
  d: string;
  
  /** Format for multiple days */
  dd: string;
  
  /** Format for a month */
  M: string;
  
  /** Format for multiple months */
  MM: string;
  
  /** Format for a year */
  y: string;
  
  /** Format for multiple years */
  yy: string;
}

/**
 * Defines and returns the Sinhala locale configuration for moment.js
 * @param momentInstance - The moment.js instance to configure
 * @returns The configured Sinhala locale
 */
export declare function defineSinhalaLocale(momentInstance: typeof import('moment')): Locale;

/**
 * Default export: Sinhala locale configuration
 */
declare const sinhalaLocale: Locale;
export default sinhalaLocale;