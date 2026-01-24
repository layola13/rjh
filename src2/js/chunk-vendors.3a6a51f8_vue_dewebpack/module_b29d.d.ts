/**
 * Moment.js locale configuration for Lao (lo)
 * Provides localized date/time formatting and relative time strings for the Lao language
 */

declare module 'moment' {
  /**
   * Locale-specific configuration for Lao language
   */
  interface LocaleSpecification {
    /** Full month names in Lao */
    months?: string | string[] | ((momentToFormat: Moment, format?: string) => string);
    
    /** Abbreviated month names in Lao */
    monthsShort?: string | string[] | ((momentToFormat: Moment, format?: string) => string);
    
    /** Full weekday names in Lao */
    weekdays?: string | string[] | ((momentToFormat: Moment, format?: string) => string);
    
    /** Abbreviated weekday names in Lao */
    weekdaysShort?: string | string[] | ((momentToFormat: Moment) => string);
    
    /** Minimal weekday names in Lao */
    weekdaysMin?: string | string[] | ((momentToFormat: Moment) => string);
    
    /** Whether to parse weekdays exactly as specified */
    weekdaysParseExact?: boolean;
    
    /** Long date format tokens and their corresponding formats */
    longDateFormat?: {
      /** Time format (e.g., "HH:mm") */
      LT?: string;
      /** Time with seconds format (e.g., "HH:mm:ss") */
      LTS?: string;
      /** Short date format (e.g., "DD/MM/YYYY") */
      L?: string;
      /** Long date format (e.g., "D MMMM YYYY") */
      LL?: string;
      /** Long date with time format */
      LLL?: string;
      /** Full date with weekday and time format */
      LLLL?: string;
      [key: string]: string | undefined;
    };
    
    /** Regular expression to parse AM/PM indicators in Lao */
    meridiemParse?: RegExp;
    
    /**
     * Determines if the given meridiem string represents PM
     * @param input - The meridiem string to check
     * @returns True if the input represents PM (afternoon/evening)
     */
    isPM?: (input: string) => boolean;
    
    /**
     * Returns the appropriate meridiem string for the given time
     * @param hours - Hour of the day (0-23)
     * @param minutes - Minute of the hour (0-59)
     * @param isLowercase - Whether to return lowercase string
     * @returns The meridiem string in Lao
     */
    meridiem?: (hours: number, minutes: number, isLowercase: boolean) => string;
    
    /** Calendar date formatting for relative dates */
    calendar?: {
      /** Format for today */
      sameDay?: string | ((now?: Moment) => string);
      /** Format for tomorrow */
      nextDay?: string | ((now?: Moment) => string);
      /** Format for next week */
      nextWeek?: string | ((now?: Moment) => string);
      /** Format for yesterday */
      lastDay?: string | ((now?: Moment) => string);
      /** Format for last week */
      lastWeek?: string | ((now?: Moment) => string);
      /** Format for all other dates */
      sameElse?: string | ((now?: Moment) => string);
      [key: string]: string | ((now?: Moment) => string) | undefined;
    };
    
    /** Relative time formatting configuration */
    relativeTime?: {
      /** Future time prefix/suffix pattern */
      future?: string | ((relTime: string) => string);
      /** Past time prefix/suffix pattern */
      past?: string | ((relTime: string) => string);
      /** Seconds (singular) */
      s?: string | ((num: number, withoutSuffix: boolean) => string);
      /** Seconds (plural) */
      ss?: string | ((num: number, withoutSuffix: boolean) => string);
      /** Minute (singular) */
      m?: string | ((num: number, withoutSuffix: boolean) => string);
      /** Minutes (plural) */
      mm?: string | ((num: number, withoutSuffix: boolean) => string);
      /** Hour (singular) */
      h?: string | ((num: number, withoutSuffix: boolean) => string);
      /** Hours (plural) */
      hh?: string | ((num: number, withoutSuffix: boolean) => string);
      /** Day (singular) */
      d?: string | ((num: number, withoutSuffix: boolean) => string);
      /** Days (plural) */
      dd?: string | ((num: number, withoutSuffix: boolean) => string);
      /** Month (singular) */
      M?: string | ((num: number, withoutSuffix: boolean) => string);
      /** Months (plural) */
      MM?: string | ((num: number, withoutSuffix: boolean) => string);
      /** Year (singular) */
      y?: string | ((num: number, withoutSuffix: boolean) => string);
      /** Years (plural) */
      yy?: string | ((num: number, withoutSuffix: boolean) => string);
      [key: string]: string | ((num: number, withoutSuffix: boolean) => string) | undefined;
    };
    
    /** Regular expression to parse ordinal day of month */
    dayOfMonthOrdinalParse?: RegExp;
    
    /**
     * Returns the ordinal representation of a number
     * @param num - The number to format as ordinal
     * @returns The ordinal string in Lao (e.g., "ທີ່1", "ທີ່2")
     */
    ordinal?: (num: number) => string;
  }

  /**
   * Defines a new locale configuration
   * @param localeKey - The locale identifier (e.g., "lo" for Lao)
   * @param config - The locale configuration object
   * @returns The configured locale
   */
  function defineLocale(localeKey: string, config: LocaleSpecification): Locale;
}

export {};