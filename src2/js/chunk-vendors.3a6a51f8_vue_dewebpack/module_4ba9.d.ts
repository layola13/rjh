/**
 * Moment.js Croatian (hr) locale configuration
 * Provides localization for dates, times, and relative time formatting in Croatian language
 */

declare module 'moment/locale/hr' {
  import { Locale, LocaleSpecification } from 'moment';

  /**
   * Croatian locale configuration for moment.js
   */
  const locale: Locale;
  export = locale;
}

declare module 'moment' {
  /**
   * Formatter function for Croatian plural forms
   * Handles the complex Croatian grammar rules for time units
   * 
   * @param value - The numeric value to format
   * @param withoutSuffix - Whether to include suffix (e.g., "ago")
   * @param key - The time unit key (ss, m, mm, h, hh, dd, MM, yy)
   * @returns Formatted string with proper Croatian plural form
   * 
   * @example
   * formatCroatianPlural(1, true, 'h') // "jedan sat"
   * formatCroatianPlural(2, false, 'hh') // "2 sata"
   * formatCroatianPlural(5, true, 'mm') // "5 minuta"
   */
  function formatCroatianPlural(
    value: number,
    withoutSuffix: boolean,
    key: 'ss' | 'm' | 'mm' | 'h' | 'hh' | 'dd' | 'MM' | 'yy'
  ): string;

  interface LocaleSpecification {
    /**
     * Month names in Croatian
     * - format: Used with dates (genitive case)
     * - standalone: Used alone (nominative case)
     */
    months?: {
      format: string[];
      standalone: string[];
    } | string[] | ((momentToFormat: Moment, format?: string) => string);

    /**
     * Abbreviated month names with periods
     */
    monthsShort?: string[] | ((momentToFormat: Moment, format?: string) => string);

    /**
     * Whether to use exact parsing for months
     */
    monthsParseExact?: boolean;

    /**
     * Full weekday names in Croatian
     */
    weekdays?: string[] | ((momentToFormat: Moment, format?: string) => string);

    /**
     * Abbreviated weekday names with periods
     */
    weekdaysShort?: string[] | ((momentToFormat: Moment, format?: string) => string);

    /**
     * Minimal two-letter weekday abbreviations
     */
    weekdaysMin?: string[] | ((momentToFormat: Moment, format?: string) => string);

    /**
     * Whether to use exact parsing for weekdays
     */
    weekdaysParseExact?: boolean;

    /**
     * Long date format tokens
     */
    longDateFormat?: {
      /** Time format (e.g., "H:mm") */
      LT?: string;
      /** Time with seconds format (e.g., "H:mm:ss") */
      LTS?: string;
      /** Short date format (e.g., "DD.MM.YYYY") */
      L?: string;
      /** Long date format (e.g., "Do MMMM YYYY") */
      LL?: string;
      /** Long date with time (e.g., "Do MMMM YYYY H:mm") */
      LLL?: string;
      /** Full date and time with weekday (e.g., "dddd, Do MMMM YYYY H:mm") */
      LLLL?: string;
      [key: string]: string | undefined;
    };

    /**
     * Calendar format configuration for relative dates
     */
    calendar?: {
      /** Format for today */
      sameDay?: string | ((now?: Moment) => string);
      /** Format for tomorrow */
      nextDay?: string | ((now?: Moment) => string);
      /** Format for next week (function handles Croatian grammar for different weekdays) */
      nextWeek?: string | ((now?: Moment) => string);
      /** Format for yesterday */
      lastDay?: string | ((now?: Moment) => string);
      /** Format for last week (function handles Croatian grammar for different weekdays) */
      lastWeek?: string | ((now?: Moment) => string);
      /** Format for other dates */
      sameElse?: string | ((now?: Moment) => string);
      [key: string]: string | ((now?: Moment) => string) | undefined;
    };

    /**
     * Relative time format configuration
     */
    relativeTime?: {
      /** Future format template (e.g., "za %s") */
      future?: string | ((relTime: string) => string);
      /** Past format template (e.g., "prije %s") */
      past?: string | ((relTime: string) => string);
      /** Seconds (single) */
      s?: string | ((num: number, withoutSuffix: boolean) => string);
      /** Seconds (plural) - uses formatCroatianPlural */
      ss?: string | ((num: number, withoutSuffix: boolean) => string);
      /** Minute (single) - uses formatCroatianPlural */
      m?: string | ((num: number, withoutSuffix: boolean) => string);
      /** Minutes (plural) - uses formatCroatianPlural */
      mm?: string | ((num: number, withoutSuffix: boolean) => string);
      /** Hour (single) - uses formatCroatianPlural */
      h?: string | ((num: number, withoutSuffix: boolean) => string);
      /** Hours (plural) - uses formatCroatianPlural */
      hh?: string | ((num: number, withoutSuffix: boolean) => string);
      /** Day (single) */
      d?: string | ((num: number, withoutSuffix: boolean) => string);
      /** Days (plural) - uses formatCroatianPlural */
      dd?: string | ((num: number, withoutSuffix: boolean) => string);
      /** Month (single) */
      M?: string | ((num: number, withoutSuffix: boolean) => string);
      /** Months (plural) - uses formatCroatianPlural */
      MM?: string | ((num: number, withoutSuffix: boolean) => string);
      /** Year (single) */
      y?: string | ((num: number, withoutSuffix: boolean) => string);
      /** Years (plural) - uses formatCroatianPlural */
      yy?: string | ((num: number, withoutSuffix: boolean) => string);
      [key: string]: string | ((num: number, withoutSuffix: boolean) => string) | undefined;
    };

    /**
     * Regular expression for parsing ordinal numbers
     */
    dayOfMonthOrdinalParse?: RegExp;

    /**
     * Function to format ordinal numbers
     */
    ordinal?: string | ((num: number) => string);

    /**
     * Week configuration
     */
    week?: {
      /** Day of week (0 = Sunday, 1 = Monday) */
      dow?: number;
      /** Day of year that defines the first week */
      doy?: number;
    };
  }
}