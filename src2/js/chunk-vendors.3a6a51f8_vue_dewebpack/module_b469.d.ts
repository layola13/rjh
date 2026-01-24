/**
 * Moment.js German (de) locale configuration module
 * Provides localization for dates, times, and relative time formatting in German
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * German locale configuration for Moment.js
 */
declare module 'moment' {
  /**
   * Formats relative time strings in German with proper grammatical cases
   * 
   * @param count - The numeric value for the time unit
   * @param withoutSuffix - Whether to use nominative (true) or dative (false) case
   * @param key - The time unit key (e.g., 'm', 'h', 'd', 'dd', 'w', 'M', 'MM', 'y', 'yy')
   * @param isFuture - Whether the time reference is in the future
   * @returns Localized relative time string in appropriate grammatical case
   * 
   * @example
   * // Returns "eine Minute" (nominative) or "einer Minute" (dative)
   * formatRelativeTime(1, true, 'm', false)
   */
  function formatRelativeTime(
    count: number,
    withoutSuffix: boolean,
    key: RelativeTimeKey,
    isFuture: boolean
  ): string;

  /**
   * Time unit keys for German relative time formatting
   */
  type RelativeTimeKey = 
    | 'm'   // minute
    | 'h'   // hour
    | 'd'   // day
    | 'dd'  // days (plural)
    | 'w'   // week
    | 'M'   // month
    | 'MM'  // months (plural)
    | 'y'   // year
    | 'yy'; // years (plural)

  /**
   * German locale specification
   */
  interface GermanLocaleSpec extends LocaleSpecification {
    /** Full month names in German */
    months: string[];
    
    /** Abbreviated month names in German */
    monthsShort: string[];
    
    /** Use exact parsing for months */
    monthsParseExact: true;
    
    /** Full weekday names in German */
    weekdays: string[];
    
    /** Short weekday names in German */
    weekdaysShort: string[];
    
    /** Minimal weekday names in German */
    weekdaysMin: string[];
    
    /** Use exact parsing for weekdays */
    weekdaysParseExact: true;
    
    /** Long date format tokens */
    longDateFormat: {
      /** Time format: HH:mm */
      LT: string;
      /** Time with seconds format: HH:mm:ss */
      LTS: string;
      /** Date format: DD.MM.YYYY */
      L: string;
      /** Long date format: D. MMMM YYYY */
      LL: string;
      /** Long date with time: D. MMMM YYYY HH:mm */
      LLL: string;
      /** Full format with weekday: dddd, D. MMMM YYYY HH:mm */
      LLLL: string;
    };
    
    /** Calendar date formatting rules */
    calendar: {
      /** Format for today: [heute um] LT [Uhr] */
      sameDay: string;
      /** Format for other dates: L */
      sameElse: string;
      /** Format for tomorrow: [morgen um] LT [Uhr] */
      nextDay: string;
      /** Format for next week: dddd [um] LT [Uhr] */
      nextWeek: string;
      /** Format for yesterday: [gestern um] LT [Uhr] */
      lastDay: string;
      /** Format for last week: [letzten] dddd [um] LT [Uhr] */
      lastWeek: string;
    };
    
    /** Relative time formatting configuration */
    relativeTime: {
      /** Future time prefix: in %s */
      future: string;
      /** Past time prefix: vor %s */
      past: string;
      /** Seconds (< 45s): ein paar Sekunden */
      s: string;
      /** Seconds with count: %d Sekunden */
      ss: string;
      /** Minute (singular) */
      m: typeof formatRelativeTime;
      /** Minutes with count: %d Minuten */
      mm: string;
      /** Hour (singular) */
      h: typeof formatRelativeTime;
      /** Hours with count: %d Stunden */
      hh: string;
      /** Day (singular) */
      d: typeof formatRelativeTime;
      /** Days with count */
      dd: typeof formatRelativeTime;
      /** Week (singular) */
      w: typeof formatRelativeTime;
      /** Weeks with count: %d Wochen */
      ww: string;
      /** Month (singular) */
      M: typeof formatRelativeTime;
      /** Months with count */
      MM: typeof formatRelativeTime;
      /** Year (singular) */
      y: typeof formatRelativeTime;
      /** Years with count */
      yy: typeof formatRelativeTime;
    };
    
    /** Regex pattern for day of month ordinal parsing: /\d{1,2}\./ */
    dayOfMonthOrdinalParse: RegExp;
    
    /** Ordinal number formatter: %d. */
    ordinal: string;
    
    /** Week configuration */
    week: {
      /** First day of week (Monday = 1) */
      dow: 1;
      /** First week of year calculation (ISO 8601) */
      doy: 4;
    };
  }
}

/**
 * Defines and registers the German locale for Moment.js
 * 
 * @remarks
 * This locale configuration includes:
 * - Full German month and weekday names
 * - Proper grammatical case handling (nominative/dative) for relative time
 * - German date/time formatting conventions (DD.MM.YYYY, 24-hour time)
 * - Week starts on Monday (ISO 8601 compliant)
 * 
 * @see {@link https://momentjs.com/docs/#/i18n/}
 */
export function defineGermanLocale(): Locale;