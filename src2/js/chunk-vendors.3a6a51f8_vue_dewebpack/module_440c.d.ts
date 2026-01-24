/**
 * Moment.js Luxembourgish (lb) locale configuration
 * Provides date/time formatting and localization for Luxembourgish language
 */

declare module 'moment/locale/lb' {
  import { Locale } from 'moment';
  
  /**
   * Locale configuration for Luxembourgish (lb)
   */
  const locale: Locale;
  export = locale;
}

/**
 * Get relative time unit name in Luxembourgish
 * @param value - The numeric value (unused in singular forms)
 * @param withoutSuffix - If true, returns nominative form; if false, returns dative form
 * @param key - Time unit key ('m' | 'h' | 'd' | 'M' | 'y')
 * @param isFuture - Whether the time is in future (unused)
 * @returns Localized time unit string
 */
declare function getRelativeTimeUnit(
  value: number,
  withoutSuffix: boolean,
  key: 'm' | 'h' | 'd' | 'M' | 'y',
  isFuture: boolean
): string;

/**
 * Format future time expression with correct article
 * @param duration - The formatted duration string
 * @returns Duration prefixed with "a" or "an" based on Luxembourgish grammar
 */
declare function formatFuture(duration: string): string;

/**
 * Format past time expression with correct preposition
 * @param duration - The formatted duration string
 * @returns Duration prefixed with "viru" or "virun" based on Luxembourgish grammar
 */
declare function formatPast(duration: string): string;

/**
 * Determine if number requires "eifeler regel" (Luxembourgish grammar rule)
 * Used to decide between "a/an" articles and "viru/virun" prepositions
 * @param number - The number to check (can be string or number)
 * @returns True if number follows the eifeler regel
 */
declare function followsEifelerRegel(number: string | number): boolean;

/**
 * Luxembourgish locale configuration interface
 */
interface LuxembourgishLocaleConfig {
  /** Full month names */
  months: string[];
  
  /** Abbreviated month names */
  monthsShort: string[];
  
  /** Whether to use exact parsing for months */
  monthsParseExact: boolean;
  
  /** Full weekday names */
  weekdays: string[];
  
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  
  /** Minimal weekday names */
  weekdaysMin: string[];
  
  /** Whether to use exact parsing for weekdays */
  weekdaysParseExact: boolean;
  
  /** Long date format templates */
  longDateFormat: {
    /** Time format: "14:30 Auer" */
    LT: string;
    /** Time with seconds: "14:30:45 Auer" */
    LTS: string;
    /** Short date: "31.12.2023" */
    L: string;
    /** Long date: "31. Dezember 2023" */
    LL: string;
    /** Long date with time */
    LLL: string;
    /** Full date with weekday and time */
    LLLL: string;
  };
  
  /** Calendar day templates */
  calendar: {
    /** Format for today */
    sameDay: string;
    /** Format for other dates */
    sameElse: string;
    /** Format for tomorrow */
    nextDay: string;
    /** Format for next week */
    nextWeek: string;
    /** Format for yesterday */
    lastDay: string;
    /** Function to format last week dates based on weekday */
    lastWeek: (this: moment.Moment) => string;
  };
  
  /** Relative time formatting */
  relativeTime: {
    /** Future time formatter */
    future: typeof formatFuture;
    /** Past time formatter */
    past: typeof formatPast;
    /** Seconds (singular/few) */
    s: string;
    /** Seconds (plural) */
    ss: string;
    /** Minute (singular) */
    m: typeof getRelativeTimeUnit;
    /** Minutes (plural) */
    mm: string;
    /** Hour (singular) */
    h: typeof getRelativeTimeUnit;
    /** Hours (plural) */
    hh: string;
    /** Day (singular) */
    d: typeof getRelativeTimeUnit;
    /** Days (plural) */
    dd: string;
    /** Month (singular) */
    M: typeof getRelativeTimeUnit;
    /** Months (plural) */
    MM: string;
    /** Year (singular) */
    y: typeof getRelativeTimeUnit;
    /** Years (plural) */
    yy: string;
  };
  
  /** Regex pattern for ordinal day parsing */
  dayOfMonthOrdinalParse: RegExp;
  
  /** Ordinal number formatter */
  ordinal: string;
  
  /** Week configuration */
  week: {
    /** Day of week (1 = Monday) */
    dow: number;
    /** Day of year for first week */
    doy: number;
  };
}

declare global {
  namespace moment {
    interface Moment {
      /**
       * Returns the day of week (0-6)
       */
      day(): number;
    }
  }
}