/**
 * Moment.js locale configuration for Tajik (tg)
 * 
 * This module provides Tajik language localization for moment.js,
 * including month names, weekday names, date formats, and relative time strings.
 */

import { Locale } from 'moment';

/**
 * Ordinal suffix mapping for Tajik numbers
 * Maps specific numbers to their corresponding ordinal suffixes
 */
interface OrdinalSuffixMap {
  readonly [key: number]: string;
}

/**
 * Ordinal suffix lookup table for Tajik language
 * Used to append correct suffix to day of month numbers
 */
declare const ordinalSuffixes: OrdinalSuffixMap;

/**
 * Month names configuration for Tajik locale
 */
interface MonthsConfig {
  /** Month names used after prepositions (genitive case) */
  format: readonly string[];
  /** Standalone month names (nominative case) */
  standalone: readonly string[];
}

/**
 * Time period identifiers for Tajik meridiem
 */
type TajikMeridiem = 'шаб' | 'субҳ' | 'рӯз' | 'бегоҳ';

/**
 * Locale configuration options for Tajik language
 */
interface TajikLocaleConfig {
  /** Month names in different grammatical forms */
  months: MonthsConfig;
  
  /** Abbreviated month names */
  monthsShort: readonly string[];
  
  /** Full weekday names */
  weekdays: readonly string[];
  
  /** Abbreviated weekday names */
  weekdaysShort: readonly string[];
  
  /** Minimal weekday names */
  weekdaysMin: readonly string[];
  
  /** Long date format tokens */
  longDateFormat: {
    readonly LT: string;
    readonly LTS: string;
    readonly L: string;
    readonly LL: string;
    readonly LLL: string;
    readonly LLLL: string;
  };
  
  /** Calendar format strings for relative dates */
  calendar: {
    readonly sameDay: string;
    readonly nextDay: string;
    readonly lastDay: string;
    readonly nextWeek: string;
    readonly lastWeek: string;
    readonly sameElse: string;
  };
  
  /** Relative time format strings */
  relativeTime: {
    readonly future: string;
    readonly past: string;
    readonly s: string;
    readonly m: string;
    readonly mm: string;
    readonly h: string;
    readonly hh: string;
    readonly d: string;
    readonly dd: string;
    readonly M: string;
    readonly MM: string;
    readonly y: string;
    readonly yy: string;
  };
  
  /** Regular expression to parse meridiem strings */
  meridiemParse: RegExp;
  
  /**
   * Converts 12-hour format to 24-hour format based on meridiem period
   * @param hour - Hour in 12-hour format (0-12)
   * @param meridiem - Time period identifier
   * @returns Hour in 24-hour format (0-23)
   */
  meridiemHour(hour: number, meridiem: string): number | undefined;
  
  /**
   * Returns the appropriate meridiem string for given time
   * @param hour - Hour in 24-hour format (0-23)
   * @param minute - Minute (0-59)
   * @param isLowercase - Whether to return lowercase format
   * @returns Meridiem string identifier
   */
  meridiem(hour: number, minute: number, isLowercase: boolean): TajikMeridiem;
  
  /** Regular expression to parse ordinal numbers */
  dayOfMonthOrdinalParse: RegExp;
  
  /**
   * Returns the ordinal form of a number
   * @param num - The number to convert
   * @returns Number with appropriate ordinal suffix
   */
  ordinal(num: number): string;
  
  /** Week configuration */
  week: {
    /** Day of week (1 = Monday) */
    readonly dow: number;
    /** Day of year that starts the first week */
    readonly doy: number;
  };
}

/**
 * Defines and registers the Tajik locale configuration with moment.js
 * @param localeId - Locale identifier ('tg' for Tajik)
 * @param config - Locale configuration object
 */
declare function defineLocale(localeId: string, config: TajikLocaleConfig): Locale;

/**
 * Tajik (tg) locale module for moment.js
 */
declare module 'moment/locale/tg' {
  const locale: Locale;
  export = locale;
}