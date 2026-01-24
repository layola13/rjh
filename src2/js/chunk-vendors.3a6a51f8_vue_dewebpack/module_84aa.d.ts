/**
 * Moment.js locale configuration for Bulgarian (bg)
 * Configures date/time formatting, relative time expressions, and calendar display for Bulgarian language
 */
declare module 'moment' {
  /**
   * Bulgarian locale configuration interface
   */
  interface LocaleSpecification {
    /** Full month names in Bulgarian */
    months: string[];
    
    /** Abbreviated month names in Bulgarian */
    monthsShort: string[];
    
    /** Full weekday names in Bulgarian */
    weekdays: string[];
    
    /** Abbreviated weekday names in Bulgarian */
    weekdaysShort: string[];
    
    /** Minimal weekday names in Bulgarian */
    weekdaysMin: string[];
    
    /** Long date format tokens and their corresponding patterns */
    longDateFormat: {
      /** Time format (e.g., "H:mm") */
      LT: string;
      /** Time format with seconds (e.g., "H:mm:ss") */
      LTS: string;
      /** Short date format (e.g., "D.MM.YYYY") */
      L: string;
      /** Long date format (e.g., "D MMMM YYYY") */
      LL: string;
      /** Long date and time format (e.g., "D MMMM YYYY H:mm") */
      LLL: string;
      /** Full date and time format with weekday (e.g., "dddd, D MMMM YYYY H:mm") */
      LLLL: string;
    };
    
    /** Calendar display configuration for relative dates */
    calendar: {
      /** Format for today (e.g., "[Днес в] LT") */
      sameDay: string;
      /** Format for tomorrow (e.g., "[Утре в] LT") */
      nextDay: string;
      /** Format for next week (e.g., "dddd [в] LT") */
      nextWeek: string;
      /** Format for yesterday (e.g., "[Вчера в] LT") */
      lastDay: string;
      /** Function returning format for last week based on day of week */
      lastWeek: (this: Moment) => string;
      /** Default format for other dates */
      sameElse: string;
    };
    
    /** Relative time expressions */
    relativeTime: {
      /** Format for future dates (e.g., "след %s") */
      future: string;
      /** Format for past dates (e.g., "преди %s") */
      past: string;
      /** Text for a few seconds */
      s: string;
      /** Format for seconds (plural) */
      ss: string;
      /** Text for one minute */
      m: string;
      /** Format for minutes (plural) */
      mm: string;
      /** Text for one hour */
      h: string;
      /** Format for hours (plural) */
      hh: string;
      /** Text for one day */
      d: string;
      /** Format for days (plural) */
      dd: string;
      /** Text for one week */
      w: string;
      /** Format for weeks (plural) */
      ww: string;
      /** Text for one month */
      M: string;
      /** Format for months (plural) */
      MM: string;
      /** Text for one year */
      y: string;
      /** Format for years (plural) */
      yy: string;
    };
    
    /** Regular expression for parsing ordinal day of month (e.g., "1-ви", "2-ри") */
    dayOfMonthOrdinalParse: RegExp;
    
    /**
     * Function to generate ordinal suffix for day of month
     * @param dayOfMonth - The day of the month (1-31)
     * @returns The day with appropriate Bulgarian ordinal suffix (e.g., "1-ви", "2-ри")
     */
    ordinal: (dayOfMonth: number) => string;
    
    /** Week configuration */
    week: {
      /** Day of week (0 = Sunday, 1 = Monday) - Bulgaria uses Monday as first day */
      dow: number;
      /** Day of year that defines week 1 */
      doy: number;
    };
  }

  /**
   * Defines or updates a locale configuration
   * @param localeName - The locale identifier (e.g., "bg")
   * @param config - The locale configuration object
   */
  function defineLocale(localeName: string, config: LocaleSpecification): Locale;

  interface Locale {
    /**
     * Returns the current day of week (0-6, where 0 = Sunday)
     */
    day(): number;
  }

  interface Moment {
    /**
     * Returns the current day of week (0-6, where 0 = Sunday)
     */
    day(): number;
  }
}

export {};