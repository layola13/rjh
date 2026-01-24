/**
 * Moment.js locale configuration for Afrikaans (af)
 * @module AfrikaansLocale
 */

import { Moment, Locale, LocaleSpecification } from 'moment';

/**
 * Configuration object for Afrikaans locale
 */
interface AfrikaansLocaleConfig extends LocaleSpecification {
  /** Full month names in Afrikaans */
  months: string[];
  
  /** Abbreviated month names in Afrikaans */
  monthsShort: string[];
  
  /** Full weekday names in Afrikaans */
  weekdays: string[];
  
  /** Abbreviated weekday names in Afrikaans */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Afrikaans */
  weekdaysMin: string[];
  
  /** Regular expression to parse meridiem (AM/PM) indicators */
  meridiemParse: RegExp;
  
  /**
   * Determines if the given meridiem string represents PM
   * @param meridiemString - The meridiem string to test (e.g., "vm" or "nm")
   * @returns true if the string represents PM (namiddag), false otherwise
   */
  isPM(meridiemString: string): boolean;
  
  /**
   * Returns the appropriate meridiem string based on hour
   * @param hour - Hour of the day (0-23)
   * @param minute - Minute of the hour (0-59)
   * @param isLowercase - Whether to return lowercase version
   * @returns "vm"/"VM" for vormiddag (AM) or "nm"/"NM" for namiddag (PM)
   */
  meridiem(hour: number, minute: number, isLowercase: boolean): string;
  
  /** Long date format tokens */
  longDateFormat: {
    /** Time format: HH:mm */
    LT: string;
    /** Time with seconds format: HH:mm:ss */
    LTS: string;
    /** Short date format: DD/MM/YYYY */
    L: string;
    /** Long date format: D MMMM YYYY */
    LL: string;
    /** Long date with time format: D MMMM YYYY HH:mm */
    LLL: string;
    /** Full date with time format: dddd, D MMMM YYYY HH:mm */
    LLLL: string;
  };
  
  /** Calendar format strings for relative dates */
  calendar: {
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
  };
  
  /** Relative time format strings */
  relativeTime: {
    /** Future time prefix format */
    future: string;
    /** Past time suffix format */
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
  };
  
  /** Regular expression to parse ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /**
   * Returns the ordinal suffix for a given number
   * @param dayOfMonth - The day of month number
   * @returns The number with appropriate ordinal suffix ("ste" or "de")
   */
  ordinal(dayOfMonth: number): string;
  
  /** Week configuration */
  week: {
    /** Day of week (1 = Monday) */
    dow: number;
    /** Day of year for first week */
    doy: number;
  };
}

/**
 * Defines the Afrikaans locale for Moment.js
 * @param momentInstance - The Moment.js instance to register the locale with
 * @returns The registered locale object
 */
export function defineAfrikaansLocale(momentInstance: typeof Moment): Locale;

/**
 * Afrikaans locale configuration constant
 */
export const afrikaansLocaleConfig: AfrikaansLocaleConfig;