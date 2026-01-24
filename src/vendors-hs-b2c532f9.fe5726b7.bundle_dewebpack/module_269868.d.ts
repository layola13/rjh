/**
 * Moment.js locale configuration for Slovenian (sl)
 * Provides localization for dates, times, and relative time formatting
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Slovenian plural form types
 */
type PluralFormContext = 's' | 'ss' | 'm' | 'mm' | 'h' | 'hh' | 'd' | 'dd' | 'M' | 'MM' | 'y' | 'yy';

/**
 * Returns the appropriate Slovenian plural form for time units
 * Slovenian has complex plural rules based on the number and grammatical case
 * 
 * @param count - The numeric value
 * @param withoutSuffix - Whether to use nominative case (true) or instrumental case (false)
 * @param key - The time unit key
 * @param isFuture - Whether the time is in the future
 * @returns The localized string with correct plural form
 */
declare function relativeTimeWithPlural(
  count: number,
  withoutSuffix: boolean,
  key: PluralFormContext,
  isFuture: boolean
): string;

/**
 * Calendar function type for nextWeek/lastWeek
 */
declare function calendarWeekFunction(this: moment.Moment): string;

/**
 * Slovenian locale configuration object
 */
declare const slLocaleConfig: LocaleSpecification;

/**
 * Moment.js Slovenian locale module
 * Defines month names, weekday names, date formats, and relative time strings
 */
declare module 'moment/locale/sl' {
  /**
   * Slovenian locale configuration
   * 
   * Features:
   * - Full and abbreviated month names
   * - Full, short, and minimal weekday names
   * - Various date/time format patterns
   * - Calendar strings (today, tomorrow, yesterday, etc.)
   * - Relative time formatting with proper plural forms
   * - Week starts on Monday (dow: 1)
   */
  const locale: Locale;
  export = locale;
}

declare global {
  namespace moment {
    interface Moment {
      /**
       * Returns day of week (0-6, Sunday = 0)
       */
      day(): number;
    }
  }
}

/**
 * Locale configuration structure for Slovenian
 */
interface SlovenianLocaleConfig {
  /** Full month names */
  months: string[];
  
  /** Abbreviated month names */
  monthsShort: string[];
  
  /** Use exact parsing for months */
  monthsParseExact: boolean;
  
  /** Full weekday names */
  weekdays: string[];
  
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  
  /** Minimal weekday names */
  weekdaysMin: string[];
  
  /** Use exact parsing for weekdays */
  weekdaysParseExact: boolean;
  
  /** Long date format tokens */
  longDateFormat: {
    /** Time format (e.g., "H:mm") */
    LT: string;
    /** Time with seconds format */
    LTS: string;
    /** Short date format */
    L: string;
    /** Long date format */
    LL: string;
    /** Long date with time */
    LLL: string;
    /** Full date with weekday and time */
    LLLL: string;
  };
  
  /** Calendar strings for relative dates */
  calendar: {
    /** Format for today */
    sameDay: string;
    /** Format for tomorrow */
    nextDay: string;
    /** Format for next week (context-dependent) */
    nextWeek: typeof calendarWeekFunction;
    /** Format for yesterday */
    lastDay: string;
    /** Format for last week (context-dependent) */
    lastWeek: typeof calendarWeekFunction;
    /** Default format */
    sameElse: string;
  };
  
  /** Relative time configuration */
  relativeTime: {
    /** Future time prefix template */
    future: string;
    /** Past time prefix template */
    past: string;
    /** Seconds */
    s: typeof relativeTimeWithPlural;
    /** Multiple seconds */
    ss: typeof relativeTimeWithPlural;
    /** Minute */
    m: typeof relativeTimeWithPlural;
    /** Multiple minutes */
    mm: typeof relativeTimeWithPlural;
    /** Hour */
    h: typeof relativeTimeWithPlural;
    /** Multiple hours */
    hh: typeof relativeTimeWithPlural;
    /** Day */
    d: typeof relativeTimeWithPlural;
    /** Multiple days */
    dd: typeof relativeTimeWithPlural;
    /** Month */
    M: typeof relativeTimeWithPlural;
    /** Multiple months */
    MM: typeof relativeTimeWithPlural;
    /** Year */
    y: typeof relativeTimeWithPlural;
    /** Multiple years */
    yy: typeof relativeTimeWithPlural;
  };
  
  /** Pattern for parsing day of month ordinals */
  dayOfMonthOrdinalParse: RegExp;
  
  /** Ordinal format function */
  ordinal: string;
  
  /** Week configuration */
  week: {
    /** Day of week (1 = Monday) */
    dow: number;
    /** Day of year for first week */
    doy: number;
  };
}

export { slLocaleConfig, SlovenianLocaleConfig, relativeTimeWithPlural, calendarWeekFunction };