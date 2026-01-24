/**
 * Moment.js Afrikaans (af) locale configuration module
 * Provides localization settings for dates and times in Afrikaans
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Meridiem identifier type for Afrikaans locale
 * - "vm" (voormiddag) = AM (lowercase)
 * - "VM" (Voormiddag) = AM (uppercase)
 * - "nm" (namiddag) = PM (lowercase)
 * - "NM" (Namiddag) = PM (uppercase)
 */
export type AfrikaansMeridiem = 'vm' | 'VM' | 'nm' | 'NM';

/**
 * Afrikaans locale configuration for moment.js
 */
export interface AfrikaansLocaleConfig extends LocaleSpecification {
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
   * @param meridiemString - The meridiem string to test (e.g., "nm" or "NM")
   * @returns true if the string represents PM (namiddag), false otherwise
   */
  isPM(meridiemString: string): boolean;
  
  /**
   * Returns the appropriate meridiem string based on time and formatting
   * @param hour - Hour of the day (0-23)
   * @param minute - Minute of the hour (0-59)
   * @param isLowercase - Whether to return lowercase format
   * @returns Meridiem string ("vm"/"VM" for morning, "nm"/"NM" for afternoon)
   */
  meridiem(hour: number, minute: number, isLowercase: boolean): AfrikaansMeridiem;
  
  /** Date/time format strings */
  longDateFormat: {
    /** Time format: Hours:Minutes */
    LT: string;
    /** Time format with seconds: Hours:Minutes:Seconds */
    LTS: string;
    /** Short date format: DD/MM/YYYY */
    L: string;
    /** Long date format: Day Month Year */
    LL: string;
    /** Long date with time format */
    LLL: string;
    /** Full date with weekday and time format */
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
    /** Future time prefix */
    future: string;
    /** Past time suffix */
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
  
  /** Regular expression to parse ordinal day numbers */
  dayOfMonthOrdinalParse: RegExp;
  
  /**
   * Returns the ordinal suffix for a given day number
   * @param dayNumber - The day of the month (1-31)
   * @returns The day number with appropriate suffix ("ste" or "de")
   */
  ordinal(dayNumber: number): string;
  
  /** Week configuration */
  week: {
    /** Day of week (0=Sunday, 1=Monday, etc.) - Afrikaans uses Monday */
    dow: number;
    /** Day of year for week calculation */
    doy: number;
  };
}

/**
 * Defines and returns the Afrikaans locale configuration for moment.js
 * @param moment - The moment.js instance
 * @returns The configured Afrikaans locale
 */
export default function defineAfrikaansLocale(moment: typeof import('moment')): Locale;