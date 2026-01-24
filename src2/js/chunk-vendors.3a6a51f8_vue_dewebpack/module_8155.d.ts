/**
 * Moment.js Slovenian (sl) locale configuration
 * Provides localization for dates, times, and relative time formatting in Slovenian language
 */

declare module 'moment' {
  namespace locale_sl {
    /**
     * Formats relative time units in Slovenian with proper grammatical cases
     * 
     * @param count - The numeric value of the time unit
     * @param withoutSuffix - Whether to format without suffix (nominative case)
     * @param key - The time unit key (s, m, h, d, M, y, etc.)
     * @param isFuture - Whether the time reference is in the future
     * @returns Localized string with proper Slovenian grammatical form
     */
    function relativeTimeWithPlural(
      count: number,
      withoutSuffix: boolean,
      key: string,
      isFuture: boolean
    ): string;

    /**
     * Locale configuration object for Slovenian
     */
    interface SlovenianLocaleConfig {
      /** Full month names in Slovenian */
      months: string[];

      /** Abbreviated month names in Slovenian */
      monthsShort: string[];

      /** Use exact parsing for month abbreviations */
      monthsParseExact: boolean;

      /** Full weekday names in Slovenian */
      weekdays: string[];

      /** Abbreviated weekday names in Slovenian */
      weekdaysShort: string[];

      /** Minimal weekday names in Slovenian */
      weekdaysMin: string[];

      /** Use exact parsing for weekday abbreviations */
      weekdaysParseExact: boolean;

      /** Long date format tokens */
      longDateFormat: {
        /** Time format (hours:minutes) */
        LT: string;
        /** Time format with seconds */
        LTS: string;
        /** Short date format */
        L: string;
        /** Long date format */
        LL: string;
        /** Long date format with time */
        LLL: string;
        /** Full date format with weekday and time */
        LLLL: string;
      };

      /** Calendar-specific date formats */
      calendar: {
        /** Format for today */
        sameDay: string;
        /** Format for tomorrow */
        nextDay: string;
        /** Function returning format for next week based on weekday */
        nextWeek(this: moment.Moment): string;
        /** Format for yesterday */
        lastDay: string;
        /** Function returning format for last week based on weekday */
        lastWeek(this: moment.Moment): string;
        /** Default format for other dates */
        sameElse: string;
      };

      /** Relative time formatting configuration */
      relativeTime: {
        /** Future time prefix template */
        future: string;
        /** Past time prefix template */
        past: string;
        /** Seconds formatter */
        s: typeof relativeTimeWithPlural;
        /** Seconds (plural) formatter */
        ss: typeof relativeTimeWithPlural;
        /** Minute formatter */
        m: typeof relativeTimeWithPlural;
        /** Minutes formatter */
        mm: typeof relativeTimeWithPlural;
        /** Hour formatter */
        h: typeof relativeTimeWithPlural;
        /** Hours formatter */
        hh: typeof relativeTimeWithPlural;
        /** Day formatter */
        d: typeof relativeTimeWithPlural;
        /** Days formatter */
        dd: typeof relativeTimeWithPlural;
        /** Month formatter */
        M: typeof relativeTimeWithPlural;
        /** Months formatter */
        MM: typeof relativeTimeWithPlural;
        /** Year formatter */
        y: typeof relativeTimeWithPlural;
        /** Years formatter */
        yy: typeof relativeTimeWithPlural;
      };

      /** Pattern for parsing ordinal day of month */
      dayOfMonthOrdinalParse: RegExp;

      /** 
       * Formats ordinal numbers (e.g., 1st, 2nd, 3rd)
       * @param num - The number to format
       * @returns Formatted ordinal string
       */
      ordinal: string;

      /** Week configuration */
      week: {
        /** Day of week (0=Sunday, 1=Monday) */
        dow: number;
        /** Day of year that defines first week */
        doy: number;
      };
    }
  }
}

export {};