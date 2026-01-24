/**
 * Moment.js locale configuration for Italian (Switzerland)
 * @module moment/locale/it-ch
 */

declare module 'moment' {
  /**
   * Locale configuration interface for moment.js
   */
  interface LocaleSpecification {
    /** Full month names */
    months?: string[] | ((momentToFormat: Moment, format?: string) => string);
    
    /** Abbreviated month names */
    monthsShort?: string[] | ((momentToFormat: Moment, format?: string) => string);
    
    /** Full weekday names */
    weekdays?: string[] | ((momentToFormat: Moment, format?: string) => string);
    
    /** Abbreviated weekday names */
    weekdaysShort?: string[] | ((momentToFormat: Moment, format?: string) => string);
    
    /** Minimal weekday names */
    weekdaysMin?: string[] | ((momentToFormat: Moment, format?: string) => string);
    
    /** Long date format tokens */
    longDateFormat?: {
      LT?: string;
      LTS?: string;
      L?: string;
      LL?: string;
      LLL?: string;
      LLLL?: string;
      l?: string;
      ll?: string;
      lll?: string;
      llll?: string;
    };
    
    /** Calendar format configuration */
    calendar?: {
      sameDay?: string | ((now?: Moment) => string);
      nextDay?: string | ((now?: Moment) => string);
      nextWeek?: string | ((now?: Moment) => string);
      lastDay?: string | ((now?: Moment) => string);
      lastWeek?: string | ((now?: Moment) => string);
      sameElse?: string | ((now?: Moment) => string);
    };
    
    /** Relative time formatting */
    relativeTime?: {
      future?: string | ((relTime: string) => string);
      past?: string | ((relTime: string) => string);
      s?: string | ((num: number, withoutSuffix: boolean) => string);
      ss?: string | ((num: number, withoutSuffix: boolean) => string);
      m?: string | ((num: number, withoutSuffix: boolean) => string);
      mm?: string | ((num: number, withoutSuffix: boolean) => string);
      h?: string | ((num: number, withoutSuffix: boolean) => string);
      hh?: string | ((num: number, withoutSuffix: boolean) => string);
      d?: string | ((num: number, withoutSuffix: boolean) => string);
      dd?: string | ((num: number, withoutSuffix: boolean) => string);
      M?: string | ((num: number, withoutSuffix: boolean) => string);
      MM?: string | ((num: number, withoutSuffix: boolean) => string);
      y?: string | ((num: number, withoutSuffix: boolean) => string);
      yy?: string | ((num: number, withoutSuffix: boolean) => string);
    };
    
    /** Pattern for parsing ordinal day of month */
    dayOfMonthOrdinalParse?: RegExp;
    
    /** Function to format ordinal numbers */
    ordinal?: string | ((num: number) => string);
    
    /** Week configuration */
    week?: {
      /** Day of week (0 = Sunday, 1 = Monday) */
      dow?: number;
      /** Day of year for week 1 */
      doy?: number;
    };
  }

  /**
   * Defines a new locale configuration
   * @param localeName - The locale identifier (e.g., 'it-ch')
   * @param config - The locale configuration object
   * @returns The defined locale
   */
  export function defineLocale(localeName: string, config: LocaleSpecification): Locale;

  /**
   * Moment instance interface
   */
  interface Moment {
    /**
     * Gets the day of the week
     * @returns Day index (0 = Sunday, 6 = Saturday)
     */
    day(): number;
  }

  /**
   * Locale object interface
   */
  interface Locale {
    // Locale properties and methods
  }
}

export {};