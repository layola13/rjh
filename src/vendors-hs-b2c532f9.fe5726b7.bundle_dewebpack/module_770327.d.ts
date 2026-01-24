/**
 * Moment.js locale configuration for Esperanto (eo)
 * 
 * This module provides localization settings for the Esperanto language,
 * including month names, weekday names, date formats, and relative time expressions.
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Meridiem parse pattern for AM/PM indicators in Esperanto
 * Matches "a.t.m" (antaŭtagmeze - before noon) or "p.t.m" (posttagmeze - after noon)
 */
type MeridiemPattern = RegExp;

/**
 * Configuration object for Esperanto locale
 */
interface EsperantoLocaleConfig extends LocaleSpecification {
  /** Full month names in Esperanto */
  months: string[];
  
  /** Abbreviated month names in Esperanto */
  monthsShort: string[];
  
  /** Full weekday names in Esperanto */
  weekdays: string[];
  
  /** Abbreviated weekday names in Esperanto */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Esperanto */
  weekdaysMin: string[];
  
  /** Long date format tokens */
  longDateFormat: {
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
    /** Lowercase full date format with weekday and time */
    llll: string;
  };
  
  /** Regular expression to parse meridiem indicators */
  meridiemParse: MeridiemPattern;
  
  /** Week configuration */
  week: {
    /** Day of week (1 = Monday) */
    dow: number;
    /** Day of year */
    doy: number;
  };
  
  /** Pattern for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
}

/**
 * Determines if a meridiem string represents PM (post meridiem)
 * @param meridiemString - The meridiem indicator string (e.g., "p.t.m" or "a.t.m")
 * @returns True if the time is in the afternoon/evening (PM), false otherwise
 */
export function isPM(meridiemString: string): boolean;

/**
 * Returns the appropriate meridiem string based on hour and formatting preference
 * @param hours - Hour of the day (0-23)
 * @param minutes - Minutes of the hour (0-59)
 * @param isLowercase - Whether to return lowercase format
 * @returns Meridiem string: "a.t.m." (AM) or "p.t.m." (PM) in uppercase or lowercase
 */
export function meridiem(hours: number, minutes: number, isLowercase: boolean): string;

/**
 * Formats an ordinal number for day of month
 * @param num - The day number
 * @returns Formatted ordinal string (e.g., "1a", "15a")
 */
export function ordinal(num: number): string;

/**
 * Esperanto locale configuration object
 */
export const esperantoLocale: EsperantoLocaleConfig;

/**
 * Registers the Esperanto locale with moment.js
 * @param moment - The moment.js instance
 * @returns The registered Esperanto locale
 */
export default function defineEsperantoLocale(moment: typeof import('moment')): Locale;