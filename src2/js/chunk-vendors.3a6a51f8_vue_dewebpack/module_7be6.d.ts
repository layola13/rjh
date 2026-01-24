/**
 * Moment.js Slovak (sk) locale configuration
 * Provides localization for dates, times, and relative time formatting in Slovak language
 */

declare module 'moment' {
  interface Moment {
    /**
     * Returns the day of the week (0-6, where 0 is Sunday)
     */
    day(): number;
  }

  interface Locale {
    /**
     * Full month names in Slovak
     */
    months: string[];

    /**
     * Abbreviated month names in Slovak
     */
    monthsShort: string[];

    /**
     * Full weekday names in Slovak
     */
    weekdays: string[];

    /**
     * Abbreviated weekday names in Slovak
     */
    weekdaysShort: string[];

    /**
     * Minimal weekday names in Slovak
     */
    weekdaysMin: string[];

    /**
     * Long date format tokens
     */
    longDateFormat: {
      /** Time format (e.g., "H:mm") */
      LT: string;
      /** Time with seconds format (e.g., "H:mm:ss") */
      LTS: string;
      /** Short date format (e.g., "DD.MM.YYYY") */
      L: string;
      /** Long date format (e.g., "D. MMMM YYYY") */
      LL: string;
      /** Long date with time format (e.g., "D. MMMM YYYY H:mm") */
      LLL: string;
      /** Full date with weekday and time format (e.g., "dddd D. MMMM YYYY H:mm") */
      LLLL: string;
    };

    /**
     * Calendar strings for relative dates
     */
    calendar: {
      /** Format for today's date */
      sameDay: string;
      /** Format for tomorrow's date */
      nextDay: string;
      /** Function to format next week's date based on day of week */
      nextWeek: (this: Moment) => string;
      /** Format for yesterday's date */
      lastDay: string;
      /** Function to format last week's date based on day of week */
      lastWeek: (this: Moment) => string;
      /** Format for all other dates */
      sameElse: string;
    };

    /**
     * Relative time configuration for Slovak language
     * All values point to the relative time formatter function
     */
    relativeTime: {
      /** Future time prefix (e.g., "za %s") */
      future: string;
      /** Past time prefix (e.g., "pred %s") */
      past: string;
      /** Seconds formatter */
      s: RelativeTimeFormatter;
      /** Multiple seconds formatter */
      ss: RelativeTimeFormatter;
      /** Minute formatter */
      m: RelativeTimeFormatter;
      /** Multiple minutes formatter */
      mm: RelativeTimeFormatter;
      /** Hour formatter */
      h: RelativeTimeFormatter;
      /** Multiple hours formatter */
      hh: RelativeTimeFormatter;
      /** Day formatter */
      d: RelativeTimeFormatter;
      /** Multiple days formatter */
      dd: RelativeTimeFormatter;
      /** Month formatter */
      M: RelativeTimeFormatter;
      /** Multiple months formatter */
      MM: RelativeTimeFormatter;
      /** Year formatter */
      y: RelativeTimeFormatter;
      /** Multiple years formatter */
      yy: RelativeTimeFormatter;
    };

    /**
     * Regular expression to parse day of month ordinal numbers (e.g., "1.", "2.")
     */
    dayOfMonthOrdinalParse: RegExp;

    /**
     * Ordinal number format string
     */
    ordinal: string;

    /**
     * Week configuration
     */
    week: {
      /** Day of week (1 = Monday) */
      dow: number;
      /** Day of year that starts the first week */
      doy: number;
    };
  }

  /**
   * Relative time formatter function signature
   * @param value - The numeric value (e.g., number of seconds, minutes, hours)
   * @param withoutSuffix - Whether to format without prefix/suffix
   * @param key - The unit key (e.g., "s", "m", "h", "d", "M", "y")
   * @param isFuture - Whether the time is in the future
   * @returns Formatted relative time string in Slovak
   */
  type RelativeTimeFormatter = (
    value: number,
    withoutSuffix: boolean,
    key: string,
    isFuture: boolean
  ) => string;

  /**
   * Defines or updates a locale configuration
   * @param localeName - The locale identifier (e.g., "sk")
   * @param config - The locale configuration object
   */
  function defineLocale(localeName: string, config: Partial<Locale>): void;
}

/**
 * Checks if a number is between 2 and 4 (inclusive of 2, exclusive of 5)
 * Used for Slovak plural forms
 * @param value - The number to check
 * @returns True if the number is 2, 3, or 4
 */
declare function isBetweenTwoAndFour(value: number): boolean;

/**
 * Formats relative time strings in Slovak with proper grammatical forms
 * Handles Slovak language plural rules and declensions
 * @param value - The numeric value
 * @param withoutSuffix - Whether formatting is without prefix/suffix
 * @param key - The unit key (s, ss, m, mm, h, hh, d, dd, M, MM, y, yy)
 * @param isFuture - Whether the time is in the future
 * @returns Formatted relative time string with proper Slovak grammar
 */
declare function formatRelativeTime(
  value: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
): string;

/**
 * Slovak locale month names (full)
 */
declare const SLOVAK_MONTHS: readonly [
  'január', 'február', 'marec', 'apríl', 'máj', 'jún',
  'júl', 'august', 'september', 'október', 'november', 'december'
];

/**
 * Slovak locale month names (abbreviated)
 */
declare const SLOVAK_MONTHS_SHORT: readonly [
  'jan', 'feb', 'mar', 'apr', 'máj', 'jún',
  'júl', 'aug', 'sep', 'okt', 'nov', 'dec'
];

/**
 * Slovak locale weekday names (full)
 */
declare const SLOVAK_WEEKDAYS: readonly [
  'nedeľa', 'pondelok', 'utorok', 'streda', 'štvrtok', 'piatok', 'sobota'
];

/**
 * Slovak locale weekday names (abbreviated and minimal - same values)
 */
declare const SLOVAK_WEEKDAYS_SHORT: readonly [
  'ne', 'po', 'ut', 'st', 'št', 'pi', 'so'
];