/**
 * Moment.js Telugu (te) locale configuration module
 * Provides localization for dates, times, and relative time formatting in Telugu language
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Meridiem (AM/PM) identifiers in Telugu
 */
type TeluguMeridiem = 'రాత్రి' | 'ఉదయం' | 'మధ్యాహ్నం' | 'సాయంత్రం';

/**
 * Telugu locale configuration for Moment.js
 */
interface TeluguLocaleConfig extends LocaleSpecification {
  /** Full month names in Telugu */
  months: string[];
  
  /** Abbreviated month names in Telugu */
  monthsShort: string[];
  
  /** Use exact matching for month parsing */
  monthsParseExact: boolean;
  
  /** Full weekday names in Telugu */
  weekdays: string[];
  
  /** Abbreviated weekday names in Telugu */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Telugu */
  weekdaysMin: string[];
  
  /** Long date format tokens */
  longDateFormat: {
    LT: string;
    LTS: string;
    L: string;
    LL: string;
    LLL: string;
    LLLL: string;
  };
  
  /** Calendar format strings for relative dates */
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
  
  /** Regular expression for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /**
   * Formats a number as an ordinal (e.g., 1 → "1వ")
   * @param dayOfMonth - The day of the month (1-31)
   * @returns Ordinal string in Telugu
   */
  ordinal: (dayOfMonth: number) => string;
  
  /** Regular expression for parsing meridiem indicators */
  meridiemParse: RegExp;
  
  /**
   * Converts 12-hour format to 24-hour format based on meridiem
   * @param hour - Hour in 12-hour format (1-12)
   * @param meridiem - Telugu meridiem indicator (రాత్రి/ఉదయం/మధ్యాహ్నం/సాయంత్రం)
   * @returns Hour in 24-hour format (0-23)
   */
  meridiemHour: (hour: number, meridiem: TeluguMeridiem) => number | undefined;
  
  /**
   * Determines the meridiem period for a given time
   * @param hour - Hour in 24-hour format (0-23)
   * @param minute - Minute (0-59)
   * @param isLowercase - Whether to return lowercase (not used in Telugu)
   * @returns Telugu meridiem identifier
   */
  meridiem: (hour: number, minute: number, isLowercase: boolean) => TeluguMeridiem;
  
  /** Week configuration */
  week: {
    /** Day of week (0 = Sunday) */
    dow: number;
    /** Day of year for week numbering */
    doy: number;
  };
}

/**
 * Defines and registers the Telugu locale with Moment.js
 * @param momentInstance - The Moment.js instance to configure
 * @returns Configured Telugu locale
 */
export function defineTeluguLocale(momentInstance: typeof import('moment')): Locale;

/**
 * Telugu locale configuration object
 */
export const teluguLocale: TeluguLocaleConfig;

export default teluguLocale;