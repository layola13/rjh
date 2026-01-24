/**
 * Moment.js Locale Configuration for Lao (lo)
 * 
 * This module provides localization support for the Lao language in moment.js,
 * including month names, weekday names, date formats, and relative time strings.
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Meridiem period type for Lao locale
 */
type MeridiemPeriod = 'ຕອນເຊົ້າ' | 'ຕອນແລງ';

/**
 * Configuration object for Lao locale
 */
interface LaoLocaleSpecification extends LocaleSpecification {
  /** Full month names in Lao */
  months: string[];
  
  /** Abbreviated month names in Lao */
  monthsShort: string[];
  
  /** Full weekday names in Lao */
  weekdays: string[];
  
  /** Abbreviated weekday names in Lao */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Lao */
  weekdaysMin: string[];
  
  /** Whether to parse weekdays exactly */
  weekdaysParseExact: boolean;
  
  /** Long date format tokens */
  longDateFormat: {
    LT: string;
    LTS: string;
    L: string;
    LL: string;
    LLL: string;
    LLLL: string;
  };
  
  /** Pattern for parsing meridiem (AM/PM) */
  meridiemParse: RegExp;
  
  /** Function to determine if a meridiem string represents PM */
  isPM: (input: string) => boolean;
  
  /** Function to get meridiem string for given hour */
  meridiem: (hour: number, minute: number, isLowercase: boolean) => MeridiemPeriod;
  
  /** Calendar format strings */
  calendar: {
    sameDay: string;
    nextDay: string;
    nextWeek: string;
    lastDay: string;
    lastWeek: string;
    sameElse: string;
  };
  
  /** Relative time format strings */
  relativeTime: {
    future: string;
    past: string;
    s: string;
    ss: string;
    m: string;
    mm: string;
    h: string;
    hh: string;
    d: string;
    dd: string;
    M: string;
    MM: string;
    y: string;
    yy: string;
  };
  
  /** Pattern for parsing day of month ordinal */
  dayOfMonthOrdinalParse: RegExp;
  
  /** Function to format day of month with ordinal */
  ordinal: (num: number) => string;
}

/**
 * Define and register the Lao locale with moment.js
 * 
 * @param moment - The moment.js instance
 * @returns The registered Lao locale
 */
export function defineLocale(moment: typeof import('moment')): Locale;

/**
 * Default export of the Lao locale configuration
 */
export default LaoLocaleSpecification;