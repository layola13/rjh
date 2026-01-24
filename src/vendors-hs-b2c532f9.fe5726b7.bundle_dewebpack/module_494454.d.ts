/**
 * Moment.js locale configuration for Turkmen (tk)
 * Provides localization for dates, times, and relative time formatting in Turkmen language
 */

import type { Moment, LocaleSpecification } from 'moment';

/**
 * Ordinal suffix mapping for Turkmen numbers
 * Maps specific numbers to their ordinal suffixes
 */
interface OrdinalSuffixMap {
  /** Numbers ending in 1 (except 11) */
  1: "'inji";
  /** Numbers ending in 5 (except 15) */
  5: "'inji";
  /** Numbers ending in 8 (except 18) */
  8: "'inji";
  /** Number 70 */
  70: "'inji";
  /** Number 80 */
  80: "'inji";
  /** Numbers ending in 2 (except 12) */
  2: "'nji";
  /** Numbers ending in 7 (except 17) */
  7: "'nji";
  /** Number 20 */
  20: "'nji";
  /** Number 50 */
  50: "'nji";
  /** Numbers ending in 3 (except 13) */
  3: "'ünji";
  /** Numbers ending in 4 (except 14) */
  4: "'ünji";
  /** Number 100 */
  100: "'ünji";
  /** Numbers ending in 6 (except 16) */
  6: "'njy";
  /** Numbers ending in 9 (except 19) */
  9: "'unjy";
  /** Number 10 */
  10: "'unjy";
  /** Number 30 */
  30: "'unjy";
  /** Number 60 */
  60: "'ynjy";
  /** Number 90 */
  90: "'ynjy";
}

/**
 * Turkmen locale configuration for Moment.js
 */
declare const turkmenLocale: LocaleSpecification;

/**
 * Gets the ordinal suffix for a number in Turkmen
 * @param value - The numeric value to get the ordinal suffix for
 * @param token - The format token (e.g., 'd', 'D', 'Do', 'DD')
 * @returns The number with appropriate Turkmen ordinal suffix
 */
export declare function ordinal(value: number, token: string): string;

/**
 * Defines the Turkmen locale for Moment.js
 * @param moment - The Moment.js instance to configure
 * @returns The configured Moment.js instance with Turkmen locale
 */
export declare function defineLocale(moment: typeof Moment): typeof Moment;

export default turkmenLocale;

/**
 * Locale configuration object structure
 */
export interface TurkmenLocaleConfig {
  /** Full month names in Turkmen */
  months: string[];
  /** Abbreviated month names in Turkmen */
  monthsShort: string[];
  /** Full weekday names in Turkmen */
  weekdays: string[];
  /** Abbreviated weekday names in Turkmen */
  weekdaysShort: string[];
  /** Minimal weekday names in Turkmen */
  weekdaysMin: string[];
  /** Long date format patterns */
  longDateFormat: {
    /** Time format (HH:mm) */
    LT: string;
    /** Time with seconds format (HH:mm:ss) */
    LTS: string;
    /** Short date format (DD.MM.YYYY) */
    L: string;
    /** Long date format (D MMMM YYYY) */
    LL: string;
    /** Long date with time format (D MMMM YYYY HH:mm) */
    LLL: string;
    /** Full date with time format (dddd, D MMMM YYYY HH:mm) */
    LLLL: string;
  };
  /** Calendar date patterns for relative days */
  calendar: {
    /** Same day format */
    sameDay: string;
    /** Next day format */
    nextDay: string;
    /** Next week format */
    nextWeek: string;
    /** Previous day format */
    lastDay: string;
    /** Last week format */
    lastWeek: string;
    /** Default format for other dates */
    sameElse: string;
  };
  /** Relative time formatting */
  relativeTime: {
    /** Future time prefix */
    future: string;
    /** Past time prefix */
    past: string;
    /** Seconds */
    s: string;
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
  /** Ordinal number formatter function */
  ordinal: (value: number, token: string) => string;
  /** Week configuration */
  week: {
    /** First day of week (1 = Monday) */
    dow: number;
    /** First day of year */
    doy: number;
  };
}