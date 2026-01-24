/**
 * Moment.js Russian (ru) locale configuration
 * Provides localization for dates, times, and relative time expressions in Russian
 */

declare module 'moment' {
  /**
   * Russian plural form selector
   * Determines the correct plural form based on Russian grammar rules
   * @param forms - Underscore-separated string containing three forms: singular_few_many
   * @param number - The number to determine plural form for
   * @returns The appropriate form from the forms string
   * @example
   * // Returns "секунда" for 1, "секунды" for 2-4, "секунд" for 5+
   * relativeTimeWithPlural("секунда_секунды_секунд", 1) // "секунда"
   * relativeTimeWithPlural("секунда_секунды_секунд", 3) // "секунды"
   * relativeTimeWithPlural("секунда_секунды_секунд", 10) // "секунд"
   */
  function relativeTimeWithPlural(forms: string, number: number): string;

  /**
   * Formats relative time with proper Russian pluralization
   * @param number - The time value
   * @param withoutSuffix - Whether to include suffix (e.g., "ago" or "in")
   * @param key - Time unit key (ss, mm, hh, dd, ww, MM, yy, m)
   * @returns Formatted relative time string
   */
  function relativeTimeWithPlural(
    number: number,
    withoutSuffix: boolean,
    key: 'ss' | 'mm' | 'hh' | 'dd' | 'ww' | 'MM' | 'yy' | 'm'
  ): string;

  interface LocaleSpecification {
    /** Month names configuration */
    months?: {
      /** Month names in genitive case (e.g., "1-го января") */
      format: string[];
      /** Month names in nominative case (e.g., "Январь") */
      standalone: string[];
    };

    /** Abbreviated month names */
    monthsShort?: {
      /** Short month names in genitive case */
      format: string[];
      /** Short month names in nominative case */
      standalone: string[];
    };

    /** Weekday names configuration */
    weekdays?: {
      /** Weekday names in nominative case */
      standalone: string[];
      /** Weekday names in accusative case (e.g., "в понедельник") */
      format: string[];
      /** Regex to detect accusative case context */
      isFormat: RegExp;
    };

    /** Abbreviated weekday names (two letters) */
    weekdaysShort?: string[];

    /** Minimal weekday names (two letters) */
    weekdaysMin?: string[];

    /** Array of regexes for parsing month names */
    monthsParse?: RegExp[];

    /** Array of regexes for parsing full month names */
    longMonthsParse?: RegExp[];

    /** Array of regexes for parsing short month names */
    shortMonthsParse?: RegExp[];

    /** Regex for matching any month format */
    monthsRegex?: RegExp;

    /** Regex for matching short month formats */
    monthsShortRegex?: RegExp;

    /** Strict regex for matching full month names */
    monthsStrictRegex?: RegExp;

    /** Strict regex for matching abbreviated month names */
    monthsShortStrictRegex?: RegExp;

    /** Date and time format tokens */
    longDateFormat?: {
      /** Time format (e.g., "14:30") */
      LT: string;
      /** Time with seconds format (e.g., "14:30:45") */
      LTS: string;
      /** Short date format (e.g., "31.12.2023") */
      L: string;
      /** Long date format (e.g., "31 декабря 2023 г.") */
      LL: string;
      /** Long date with time (e.g., "31 декабря 2023 г., 14:30") */
      LLL: string;
      /** Full date and time (e.g., "воскресенье, 31 декабря 2023 г., 14:30") */
      LLLL: string;
    };

    /** Calendar time representations */
    calendar?: {
      /** Format for today */
      sameDay: string;
      /** Format for tomorrow */
      nextDay: string;
      /** Format for yesterday */
      lastDay: string;
      /** 
       * Format for next week dates
       * @param momentInstance - The moment being compared
       * @returns Formatted string with proper grammatical case
       */
      nextWeek?: (this: moment.Moment, momentInstance: moment.Moment) => string;
      /**
       * Format for last week dates
       * @param momentInstance - The moment being compared
       * @returns Formatted string with proper grammatical case
       */
      lastWeek?: (this: moment.Moment, momentInstance: moment.Moment) => string;
      /** Format for all other dates */
      sameElse: string;
    };

    /** Relative time formatting */
    relativeTime?: {
      /** Future time prefix (e.g., "in 5 minutes" = "через 5 минут") */
      future: string;
      /** Past time suffix (e.g., "5 minutes ago" = "5 минут назад") */
      past: string;
      /** Few seconds */
      s: string;
      /** Seconds (plural function) */
      ss: typeof relativeTimeWithPlural;
      /** Minute (singular or plural function) */
      m: typeof relativeTimeWithPlural;
      /** Minutes (plural function) */
      mm: typeof relativeTimeWithPlural;
      /** Hour (singular) */
      h: string;
      /** Hours (plural function) */
      hh: typeof relativeTimeWithPlural;
      /** Day (singular) */
      d: string;
      /** Days (plural function) */
      dd: typeof relativeTimeWithPlural;
      /** Week (singular) */
      w: string;
      /** Weeks (plural function) */
      ww: typeof relativeTimeWithPlural;
      /** Month (singular) */
      M: string;
      /** Months (plural function) */
      MM: typeof relativeTimeWithPlural;
      /** Year (singular) */
      y: string;
      /** Years (plural function) */
      yy: typeof relativeTimeWithPlural;
    };

    /** Regex for parsing meridiem (AM/PM equivalent) */
    meridiemParse?: RegExp;

    /**
     * Determines if time is PM (afternoon/evening)
     * @param meridiemString - The meridiem string ("ночи", "утра", "дня", "вечера")
     * @returns true if PM (afternoon/evening), false otherwise
     */
    isPM?: (meridiemString: string) => boolean;

    /**
     * Returns the appropriate meridiem string for a given time
     * @param hour - Hour (0-23)
     * @param minute - Minute (0-59)
     * @param isLowercase - Whether to return lowercase (unused in Russian)
     * @returns "ночи" (night), "утра" (morning), "дня" (day), or "вечера" (evening)
     */
    meridiem?: (hour: number, minute: number, isLowercase: boolean) => string;

    /** Regex for parsing ordinal day numbers (e.g., "1-й", "2-го", "3-я") */
    dayOfMonthOrdinalParse?: RegExp;

    /**
     * Formats a number with the appropriate ordinal suffix
     * @param number - The number to format
     * @param token - The formatting token (M, d, D, DDD, w, W)
     * @returns Number with ordinal suffix (e.g., "1-й", "2-го", "3-я")
     */
    ordinal?: (number: number, token: string) => string;

    /** Week configuration */
    week?: {
      /** First day of week (1 = Monday) */
      dow: number;
      /** First week of year rule (4 = ISO 8601) */
      doy: number;
    };
  }
}

export {};