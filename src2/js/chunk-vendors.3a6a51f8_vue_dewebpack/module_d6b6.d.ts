/**
 * Moment.js locale configuration for Armenian (hy-am)
 * @module moment/locale/hy-am
 */

import { Locale, LocaleSpecification } from 'moment';

declare module 'moment' {
  /**
   * Armenian (hy-am) locale configuration
   */
  interface HyAmLocale extends LocaleSpecification {
    /**
     * Month names in Armenian
     */
    months: {
      /**
       * Month names in genitive case (used after a date number)
       */
      format: string[];
      /**
       * Month names in nominative case (standalone usage)
       */
      standalone: string[];
    };

    /**
     * Abbreviated month names
     */
    monthsShort: string[];

    /**
     * Full weekday names
     */
    weekdays: string[];

    /**
     * Abbreviated weekday names
     */
    weekdaysShort: string[];

    /**
     * Minimal weekday names
     */
    weekdaysMin: string[];

    /**
     * Long date format tokens
     */
    longDateFormat: {
      /** Time format (24-hour) */
      LT: string;
      /** Time format with seconds */
      LTS: string;
      /** Short date format */
      L: string;
      /** Long date format */
      LL: string;
      /** Long date and time format */
      LLL: string;
      /** Full date and time format with weekday */
      LLLL: string;
    };

    /**
     * Calendar format strings for relative dates
     */
    calendar: {
      /** Format for today */
      sameDay: string;
      /** Format for tomorrow */
      nextDay: string;
      /** Format for yesterday */
      lastDay: string;
      /**
       * Format for next week
       * @returns Format string for dates in the next week
       */
      nextWeek: () => string;
      /**
       * Format for last week
       * @returns Format string for dates in the last week
       */
      lastWeek: () => string;
      /** Format for all other dates */
      sameElse: string;
    };

    /**
     * Relative time format strings
     */
    relativeTime: {
      /** Future time prefix/suffix template */
      future: string;
      /** Past time prefix/suffix template */
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

    /**
     * Regular expression to parse meridiem (AM/PM equivalent)
     */
    meridiemParse: RegExp;

    /**
     * Determine if the given meridiem string represents PM
     * @param meridiemString - The meridiem string to check
     * @returns True if the string represents afternoon/evening
     */
    isPM: (meridiemString: string) => boolean;

    /**
     * Get the meridiem string for a given hour
     * @param hour - Hour of the day (0-23)
     * @returns Meridiem string in Armenian
     */
    meridiem: (hour: number) => string;

    /**
     * Regular expression to parse ordinal day numbers
     */
    dayOfMonthOrdinalParse: RegExp;

    /**
     * Format a number as an ordinal
     * @param num - The number to format
     * @param token - The format token indicating the context
     * @returns The formatted ordinal string
     */
    ordinal: (num: number, token: string) => string;

    /**
     * Week configuration
     */
    week: {
      /** Day of week (0=Sunday, 1=Monday) */
      dow: number;
      /** Day of year for the first week */
      doy: number;
    };
  }

  /**
   * Define or retrieve the Armenian locale
   * @param localeName - Should be "hy-am"
   * @param config - Optional locale configuration
   * @returns The defined locale
   */
  function defineLocale(localeName: 'hy-am', config?: Partial<HyAmLocale>): Locale;
}

export {};